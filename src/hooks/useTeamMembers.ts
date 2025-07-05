
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TeamMember {
  id: string;
  email: string;
  full_name: string | null;
  role: string | null;
  status: string | null;
  phone: string | null;
  location: string | null;
  avatar_url: string | null;
  invited_at: string | null;
}

export const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error: any) {
      console.error('Error fetching team members:', error);
      toast({
        title: "Error",
        description: "Failed to load team members",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const inviteTeamMember = async (email: string, fullName: string, role: string = 'member') => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .insert([
          {
            email,
            full_name: fullName,
            role,
            status: 'pending',
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Invitation sent!",
        description: `Invitation sent to ${email}`,
      });

      // Refresh the list
      fetchTeamMembers();
      return { success: true };
    } catch (error: any) {
      console.error('Error inviting team member:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send invitation",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return {
    teamMembers,
    loading,
    inviteTeamMember,
    refetch: fetchTeamMembers,
  };
};
