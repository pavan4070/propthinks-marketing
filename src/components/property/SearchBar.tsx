'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Building2, Wallet, ChevronDown, Check, X } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface DropdownOption {
  value: string;
  label: string;
}

function CustomDropdown({ 
  value, 
  options, 
  placeholder, 
  icon: Icon, 
  onChange,
  isOpen,
  onToggle,
  onClose
}: { 
  value: string;
  options: DropdownOption[];
  placeholder: string;
  icon: React.ElementType;
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
          isOpen 
            ? 'bg-[#1fb6e0]/10 text-[#1fb6e0]' 
            : value 
              ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
              : 'hover:bg-gray-100 text-gray-500'
        }`}
      >
        <Icon className={`w-4 h-4 ${isOpen || value ? 'text-[#1fb6e0]' : 'text-gray-400'}`} />
        <span className={`text-sm font-medium ${value ? 'text-gray-800' : 'text-gray-500'}`}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 min-w-[180px] bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                onClose();
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${
                value === option.value 
                  ? 'bg-[#1fb6e0]/10 text-[#1fb6e0] font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span>{option.label}</span>
              {value === option.value && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function SearchBar() {
  const router = useRouter();
  const [city, setCity] = useState('');
  const [bhk, setBhk] = useState('');
  const [budget, setBudget] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const hasFilters = Boolean(city || bhk || budget);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (bhk) params.set('bhk', bhk);
    if (budget) params.set('budget', budget);
    
    const queryString = params.toString();
    router.push(`/properties${queryString ? `?${queryString}` : ''}`);
  };

  const handleClear = () => {
    setCity('');
    setBhk('');
    setBudget('');
  };

  const cityOptions: DropdownOption[] = [
    { value: '', label: 'All Cities' },
    ...siteConfig.markets.map(m => ({ value: m.slug, label: m.name }))
  ];

  const bhkOptions: DropdownOption[] = [
    { value: '', label: 'Any BHK' },
    { value: '1', label: '1 BHK' },
    { value: '2', label: '2 BHK' },
    { value: '3', label: '3 BHK' },
    { value: '4', label: '4+ BHK' },
  ];

  const budgetOptions: DropdownOption[] = [
    { value: '', label: 'Any Budget' },
    { value: '0-10000', label: 'Under ₹10k' },
    { value: '10000-20000', label: '₹10k - ₹20k' },
    { value: '20000-30000', label: '₹20k - ₹30k' },
    { value: '30000-50000', label: '₹30k - ₹50k' },
    { value: '50000+', label: '₹50k+' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        {/* Slim Search Bar */}
        <div className="flex items-center gap-1 p-1.5 bg-white rounded-full shadow-lg shadow-gray-200/50 border border-gray-100">
          {/* Dropdowns Container */}
          <div className="flex items-center gap-1 flex-1">
            <CustomDropdown
              value={city}
              options={cityOptions}
              placeholder="Location"
              icon={MapPin}
              onChange={setCity}
              isOpen={openDropdown === 'city'}
              onToggle={() => setOpenDropdown(openDropdown === 'city' ? null : 'city')}
              onClose={() => setOpenDropdown(null)}
            />

            <div className="w-px h-5 bg-gray-200" />

            <CustomDropdown
              value={bhk}
              options={bhkOptions}
              placeholder="BHK"
              icon={Building2}
              onChange={setBhk}
              isOpen={openDropdown === 'bhk'}
              onToggle={() => setOpenDropdown(openDropdown === 'bhk' ? null : 'bhk')}
              onClose={() => setOpenDropdown(null)}
            />

            <div className="w-px h-5 bg-gray-200" />

            <CustomDropdown
              value={budget}
              options={budgetOptions}
              placeholder="Budget"
              icon={Wallet}
              onChange={setBudget}
              isOpen={openDropdown === 'budget'}
              onToggle={() => setOpenDropdown(openDropdown === 'budget' ? null : 'budget')}
              onClose={() => setOpenDropdown(null)}
            />
          </div>

          {/* Clear Button */}
          {hasFilters && (
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Search Button */}
          <button 
            type="submit" 
            className="flex items-center gap-2 h-10 px-5 bg-[#1fb6e0] hover:bg-[#0ea5c9] text-white font-medium rounded-full shadow-md shadow-[#1fb6e0]/25 transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline text-sm">Search</span>
          </button>
        </div>

        {/* Mobile: Stacked Layout */}
        <div className="md:hidden mt-4 space-y-2">
          <div className="grid grid-cols-3 gap-2">
            {/* Location Chip */}
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'city-mobile' ? null : 'city-mobile')}
              className={`relative flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                city ? 'bg-[#1fb6e0]/10 text-[#1fb6e0] border border-[#1fb6e0]/20' : 'bg-gray-100 text-gray-600 border border-transparent'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span className="truncate">{city ? cityOptions.find(o => o.value === city)?.label : 'City'}</span>
              
              {openDropdown === 'city-mobile' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50">
                  {cityOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCity(option.value);
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm ${
                        city === option.value ? 'bg-[#1fb6e0]/10 text-[#1fb6e0] font-medium' : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </button>

            {/* BHK Chip */}
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'bhk-mobile' ? null : 'bhk-mobile')}
              className={`relative flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                bhk ? 'bg-[#1fb6e0]/10 text-[#1fb6e0] border border-[#1fb6e0]/20' : 'bg-gray-100 text-gray-600 border border-transparent'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span className="truncate">{bhk ? `${bhk} BHK` : 'BHK'}</span>
              
              {openDropdown === 'bhk-mobile' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50">
                  {bhkOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBhk(option.value);
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm ${
                        bhk === option.value ? 'bg-[#1fb6e0]/10 text-[#1fb6e0] font-medium' : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </button>

            {/* Budget Chip */}
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'budget-mobile' ? null : 'budget-mobile')}
              className={`relative flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                budget ? 'bg-[#1fb6e0]/10 text-[#1fb6e0] border border-[#1fb6e0]/20' : 'bg-gray-100 text-gray-600 border border-transparent'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span className="truncate">{budget ? budgetOptions.find(o => o.value === budget)?.label : 'Budget'}</span>
              
              {openDropdown === 'budget-mobile' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50">
                  {budgetOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBudget(option.value);
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm ${
                        budget === option.value ? 'bg-[#1fb6e0]/10 text-[#1fb6e0] font-medium' : 'text-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </button>
          </div>

          {/* Mobile Search Button */}
          <button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2 h-12 bg-[#1fb6e0] hover:bg-[#0ea5c9] text-white font-semibold rounded-xl shadow-lg shadow-[#1fb6e0]/25 transition-all active:scale-[0.98]"
          >
            <Search className="w-5 h-5" />
            <span>Search Properties</span>
          </button>
        </div>
      </form>
    </div>
  );
}
