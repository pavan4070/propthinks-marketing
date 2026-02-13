'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

interface PropertyFiltersProps {
  currentCity?: string;
  currentBhk?: string;
  currentBudget?: string;
}

export function PropertyFilters({ currentCity, currentBhk, currentBudget }: PropertyFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/properties?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/properties');
  };

  const hasFilters = currentCity || currentBhk || currentBudget;

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* City Filter */}
      <select
        value={currentCity || ''}
        onChange={(e) => updateFilter('city', e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1fb6e0] focus:border-transparent"
      >
        <option value="">All Cities</option>
        {siteConfig.markets.map((market) => (
          <option key={market.slug} value={market.slug}>
            {market.name}
          </option>
        ))}
      </select>

      {/* BHK Filter */}
      <select
        value={currentBhk || ''}
        onChange={(e) => updateFilter('bhk', e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1fb6e0] focus:border-transparent"
      >
        <option value="">All BHK</option>
        <option value="1">1 BHK</option>
        <option value="2">2 BHK</option>
        <option value="3">3 BHK</option>
        <option value="4">4+ BHK</option>
      </select>

      {/* Budget Filter */}
      <select
        value={currentBudget || ''}
        onChange={(e) => updateFilter('budget', e.target.value)}
        className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#1fb6e0] focus:border-transparent"
      >
        <option value="">All Budgets</option>
        <option value="0-10000">Up to ₹10,000</option>
        <option value="10000-20000">₹10,000 - ₹20,000</option>
        <option value="20000-30000">₹20,000 - ₹30,000</option>
        <option value="30000-50000">₹30,000 - ₹50,000</option>
        <option value="50000+">₹50,000+</option>
      </select>

      {/* Clear Filters */}
      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4 mr-1" />
          Clear filters
        </Button>
      )}
    </div>
  );
}
