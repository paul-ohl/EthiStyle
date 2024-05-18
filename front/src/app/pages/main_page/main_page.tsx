import { SearchTab } from 'app/pages/search_tab/main';
import { useState } from 'react';
import TabBar from './tabs';
import { Profile } from 'app/profile_page/profile';

export enum SelectedTab {
  Home,
  Search,
  Add,
  Notifications,
  Profile,
}

export const MainPage = () => {
  const [selectedTab, setSelectedTab] = useState<SelectedTab>(SelectedTab.Search);

  return (
    <>
      {getTab(selectedTab)}
      <div className="fixed w-full bottom-6">
        <TabBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
    </>
  );
}

const getTab = (selectedTab: SelectedTab) => {
  switch (selectedTab) {
    case SelectedTab.Home:
      // return <Home />;
      return <p className='text-center w-full mt-36 text-xl font-raleway'>Home</p>;
    case SelectedTab.Search:
      return <SearchTab />;
    case SelectedTab.Add:
      return <p>Add</p>;
    // return <Add />;
    case SelectedTab.Notifications:
      return <p>Notifications</p>;
    // return <Notifications />;
    case SelectedTab.Profile:
      return <Profile />;
  }
}
