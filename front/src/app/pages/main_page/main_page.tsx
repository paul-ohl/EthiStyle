import { SearchTab } from 'app/pages/search_tab/main';
import { useState } from 'react';
import TabBar from './tabs';
import { Profile } from 'app/profile_page/profile';
import { HomePage } from '../home_page/home_page';

export enum SelectedTab {
  Home,
  Search,
  Notifications,
  Profile,
}

export const MainPage = () => {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>(SelectedTab.Home);
  const [searchTerms, setSearchTerms] = useState<string>('');

  return (
    <div>
      {selectedTab == SelectedTab.Home &&
        <HomePage setSelectedTab={setSelectedTab} setSearchTerms={setSearchTerms} />}
      {selectedTab == SelectedTab.Search &&
        <SearchTab searchTerms={searchTerms} setSearchTerms={setSearchTerms} />}
      {selectedTab == SelectedTab.Notifications &&
        <p className='text-center w-full mt-36 text-xl font-raleway'>Notifications</p>}
      {selectedTab == SelectedTab.Profile &&
        <Profile />}
      <div className="fixed w-full bottom-6">
        <TabBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
    </div>
  );
}
