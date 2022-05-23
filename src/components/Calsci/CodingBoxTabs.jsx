import React from "react";
import PropTypes from "prop-types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CustomDatapoints from "./CustomDatapoints/CustomDatapoints";
import SavedDataPoints from "./SavedDataPointsTab/SavedDatapoints";

const CodingBoxTabs = ({ tabIndex, setTabIndex }) => {
  const handleTabSelect = (tabIndex) => setTabIndex(tabIndex);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={handleTabSelect}>
      <TabList className='codingbox-tabs'>
        <Tab className='tab-styles'>Custom Datapoints</Tab>
        <Tab className='tab-styles'>Saved Datapoints</Tab>
      </TabList>
      <TabPanel>
        <CustomDatapoints />
      </TabPanel>
      <TabPanel>
        <SavedDataPoints />
      </TabPanel>
    </Tabs>
  );
};

CodingBoxTabs.propTypes = {
  tabIndex: PropTypes.number,
  setTabIndex: PropTypes.func,
};

export default CodingBoxTabs;
