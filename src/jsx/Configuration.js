import React, {useState, useContext} from 'react';
import {AppContext} from '../context';
import PropTypes from 'prop-types';

// Components
import {
  DirectoryInput,
  FileInput,
  NumberInput,
  TextInput,
} from './elements/inputs';

/**
 * Configuration - the Data Configuration component.
 * @param {object} props
 * @return {JSX.Element}
 */
const Configuration = (props) => {
  // React Context
  const appContext = useContext(AppContext);

  // React State
  const [edfFile, setEdfFile] = useState({});
  const [eventsTSV, setEventsTSV] = useState({});
  const [bidsDirectory, setBidsDirectory] = useState(null);
  const [lineFreq, setLineFreq] = useState('');
  const [siteID, setSiteID] = useState('');

  /**
   * onUserInput - input change by user.
   * @param {string} name - element name
   * @param {object|string} value - element value
   */
  const onUserInput = async (name, value) => {
    // Update the state of Configuration.
    switch (name) {
      case 'edfFile': {
        await setEdfFile(value);
        break;
      }
      case 'eventsTSV': {
        await setEventsTSV(value);
        break;
      }
      case 'bidsDirectory': {
        await setBidsDirectory(value);
        break;
      }
      case 'lineFreq': {
        await setLineFreq(value);
        break;
      }
      case 'siteID': {
        await setSiteID(value);
        break;
      }
      default: {
        return;
      }
    }
    // Update the 'task' of app context.
    await appContext.setTask(name, value);
  };

  /**
   * Renders the React component.
   * @return {JSX.Element} - React markup for component.
   */
  return props.visible ? (
    <>
      <div className={'header'}>
        Data Configuration
      </div>
      <div className={'info'}>
        <div className={'small-pad'}>
          <FileInput id='edfFile'
            name='edfFile'
            accept='.edf'
            placeholder={edfFile['name']}
            label='1. The file.edf to convert: '
            onUserInput={onUserInput}
          />
        </div>
        <div className={'small-pad'}>
          <FileInput id='eventsTSV'
            name='eventsTSV'
            accept='.tsv'
            placeholder={eventsTSV['name']}
            label='2. The events.tsv to include: '
            onUserInput={onUserInput}
          />
        </div>
        <div className={'small-pad'}>
          <DirectoryInput id='bidsDirectory'
            name='bidsDirectory'
            label='3. The BIDS output directory: '
            placeholder={bidsDirectory}
            onUserInput={onUserInput}
          />
        </div>
        <div className={'small-pad'}>
          <NumberInput id='lineFreq'
            name='lineFreq'
            label='4. The line_freq used: '
            value={lineFreq}
            placeholder='60'
            onUserInput={onUserInput}
          />
        </div>
      </div>
      <div className={'header'}>
        LORIS meta data
      </div>
      <div className={'info'}>
        <div className={'small-pad'}>
          <TextInput id='siteID'
            name='siteID'
            label='5. The SiteID from LORIS: '
            value={siteID}
            onUserInput={onUserInput}
          />
        </div>
      </div>
    </>
  ) : null;
};
Configuration.propTypes = {
  visible: PropTypes.bool,
};

export default Configuration;
