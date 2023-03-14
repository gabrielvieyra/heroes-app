import { FC } from 'react';

// Styles
import './styles.scss';

interface InfoProps {
  sectionName: string;
  sectionData: string;
}

const Info: FC<InfoProps> = ({ sectionName, sectionData }) => {
  return (
    <div className='info'>
      <h4 className='info__sectionName'>{sectionName}</h4>
      <h3>{sectionData}</h3>
    </div>
  );
};

export default Info;
