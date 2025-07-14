import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import CommunityFeed from '../../components/community/CommunityFeed';

const CommunityPage = () => {
  return (
    <PageLayout title="Community">
      <CommunityFeed />
    </PageLayout>
  );
};

export default CommunityPage; 