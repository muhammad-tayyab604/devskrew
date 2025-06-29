'use client';

import { useState, useEffect } from 'react';
import { Linkedin, X, Users } from "lucide-react";
import { AnimatedTeamMembers } from "../ui/animated-testimonials";
import { teamMembersService, TeamMember } from '@/lib/firestore';

const iconMap = {
  linkedin: Linkedin,
  twitter: X,
};
type IconName = keyof typeof iconMap;

type Social = {
  icon: IconName;
  url: string;
};

export function TeamCarousel() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const membersList = await teamMembersService.getAll();
        setTeamMembers(membersList);
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (teamMembers.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Team Profiles Coming Soon
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            We're currently updating our team profiles. Check back soon to meet the amazing people behind our success.
          </p>
        </div>
      </div>
    );
  }

  const testimonials = teamMembers.map(member => ({
    quote: member.bio,
    name: member.name,
    designation: member.designation,
    src: member.imageUrl,
    socials: [
      ...(member.linkedinUrl ? [{ icon: "linkedin" as IconName, url: member.linkedinUrl }] : []),
      ...(member.twitterUrl ? [{ icon: "twitter" as IconName, url: member.twitterUrl }] : []),
    ],
  }));

  return <AnimatedTeamMembers testimonials={testimonials} />;
}