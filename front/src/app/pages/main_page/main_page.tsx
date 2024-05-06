import { SearchTab } from 'app/pages/search_tab/search_tab';
import React, { useEffect, useRef } from 'react';
import Tab from './tabs';

export enum SelectedTab {
  Home,
  Search,
  Add,
  Notifications,
  Profile,
}

export const MainPage = () => {
  const selectedTab = React.useRef<SelectedTab>(SelectedTab.Search);
  const [displayedTab, setDisplayedTab] = React.useState(getTab(selectedTab.current));

  useEffect(() => {
    setDisplayedTab(getTab(selectedTab.current));
  }, [selectedTab.current]);

  return (
    <>
      {displayedTab}
      <div className="absolute w-full bottom-6">
        <Tab selectedTab={selectedTab} />
      </div>
    </>
  );
}

const getTab = (selectedTab: SelectedTab) => {
  switch (selectedTab) {
    case SelectedTab.Home:
      // return <Home />;
      return <p>Home</p>;
    case SelectedTab.Search:
      return <SearchTab />;
    case SelectedTab.Add:
      return <p>Add</p>;
    // return <Add />;
    case SelectedTab.Notifications:
      return <p>Notifications</p>;
    // return <Notifications />;
    case SelectedTab.Profile:
      return <p>Profile</p>;
    // return <Profile />;
  }
}
