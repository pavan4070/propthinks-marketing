'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Edit2,
  Save,
  X,
  AlertCircle,
  ArrowRight,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import type { PropertyVisitResponse } from '@/lib/api';
import { api } from '@/lib/api';

interface UserProfile {
  full_name: string;
  email: string;
  phone: string;
}

const VISIT_STATUS_CONFIG = {
  scheduled: { label: 'Scheduled', color: 'bg-blue-100 text-blue-800', icon: Calendar },
  confirmed: { label: 'Confirmed', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  completed: { label: 'Completed', color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800', icon: XCircle },
  no_show: { label: 'No Show', color: 'bg-orange-100 text-orange-800', icon: AlertCircle },
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingVisits, setIsLoadingVisits] = useState(true);
  const [formData, setFormData] = useState<UserProfile>({
    full_name: '',
    email: '',
    phone: '',
  });
  const [visits, setVisits] = useState<PropertyVisitResponse[]>([]);
  const [activeVisitsCount, setActiveVisitsCount] = useState(0);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  // Load user profile and visits
  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
      
      loadVisits();
    }
  }, [user]);

  const loadVisits = async () => {
    try {
      setIsLoadingVisits(true);
      const response = await api.get<PropertyVisitResponse[]>('/property-visits', {
        withCredentials: true,
      });
      
      const visitsList = response.data || [];
      setVisits(visitsList);
      
      // Count active visits (requested, scheduled, or confirmed - not cancelled/completed/no_show)
      const activeCount = visitsList.filter(
        v => v.status === 'requested' || v.status === 'scheduled' || v.status === 'confirmed'
      ).length;
      setActiveVisitsCount(activeCount);
    } catch (error) {
      console.error('Failed to load visits:', error);
    } finally {
      setIsLoadingVisits(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await api.patch('/users/me', formData, {
        withCredentials: true,
      });
      setIsEditing(false);
      // Show success message (you can use toast here)
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset form data to original user data
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  };

  const handleCancelVisit = async (visitId: string) => {
    const reason = prompt('Please provide a cancellation reason:');
    if (!reason) return;

    try {
      await api.patch(`/property-visits/${visitId}/cancel`, {
        cancellation_reason: reason,
      }, {
        withCredentials: true,
      });
      
      // Reload visits
      await loadVisits();
      alert('Visit cancelled successfully!');
    } catch (error) {
      console.error('Failed to cancel visit:', error);
      alert('Failed to cancel visit. Please try again.');
    }
  };

  const handleApplyForProperty = (propertyPublicId: string, listingPublicId?: string) => {
    // Navigate to token payment page (to be implemented)
    // For now, navigate to property detail page
    router.push(`/properties/${listingPublicId || propertyPublicId}`);
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1fb6e0] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account and track property visits</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-[#1fb6e0] flex items-center justify-center text-white text-3xl font-bold mb-3">
                  {formData.full_name.charAt(0).toUpperCase() || 'U'}
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{formData.full_name}</h2>
                <p className="text-sm text-gray-500">{user.role === 'tenant' ? 'Tenant' : 'Owner'}</p>
              </div>

              {/* Edit Toggle */}
              <div className="flex justify-center mb-6">
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="w-full"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2 w-full">
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex-1 bg-[#1fb6e0] hover:bg-[#1fb6e0]/90"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      disabled={isSaving}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Profile Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <Input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.full_name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email
                  </label>
                  <p className="text-gray-900">{formData.email}</p>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone
                  </label>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full"
                    />
                  ) : (
                    <p className="text-gray-900">{formData.phone || 'Not provided'}</p>
                  )}
                </div>
              </div>

              {/* Visit Limit Indicator */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Active Visits</span>
                    <span className="text-2xl font-bold text-[#1fb6e0]">
                      {activeVisitsCount}/2
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    You can schedule up to 2 property visits at a time
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visit History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Visit History</h3>
                <Button
                  onClick={() => router.push('/properties')}
                  variant="outline"
                  size="sm"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Browse Properties
                </Button>
              </div>

              {isLoadingVisits ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1fb6e0] mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading visits...</p>
                </div>
              ) : visits.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No visits scheduled</h4>
                  <p className="text-gray-600 mb-6">
                    Start exploring properties and schedule your first visit!
                  </p>
                  <Button
                    onClick={() => router.push('/properties')}
                    className="bg-[#1fb6e0] hover:bg-[#1fb6e0]/90"
                  >
                    Browse Properties
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {visits.map((visit) => {
                    const statusConfig = VISIT_STATUS_CONFIG[visit.status as keyof typeof VISIT_STATUS_CONFIG];
                    const StatusIcon = statusConfig?.icon || Calendar;
                    const isCancellable = visit.status === 'requested' || visit.status === 'scheduled' || visit.status === 'confirmed';
                    const isCompleted = visit.status === 'completed';

                    return (
                      <div
                        key={visit.public_id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {visit.property_public_id ? `Property ${visit.property_public_id.substring(0, 8)}...` : 'Property Visit'}
                            </h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{format(new Date(visit.requested_date), 'MMM dd, yyyy')}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{visit.requested_time_slot}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>{visit.visitor_phone}</span>
                              </div>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig?.color || 'bg-gray-100 text-gray-800'}`}>
                            <StatusIcon className="h-3 w-3 inline mr-1" />
                            {statusConfig?.label || visit.status}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-4">
                          {isCancellable && (
                            <Button
                              onClick={() => handleCancelVisit(visit.public_id)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:bg-red-50 border-red-200"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel Visit
                            </Button>
                          )}
                          
                          {isCompleted && (
                            <Button
                              onClick={() => handleApplyForProperty(
                                visit.property_public_id, 
                                visit.listing_public_id
                              )}
                              className="bg-[#1fb6e0] hover:bg-[#1fb6e0]/90"
                              size="sm"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Apply for Property
                            </Button>
                          )}
                        </div>

                        {visit.visitor_notes && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-xs text-gray-600">
                              <strong>Notes:</strong> {visit.visitor_notes}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
