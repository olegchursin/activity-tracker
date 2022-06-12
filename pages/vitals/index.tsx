import styles from '../activities/Activities.module.css';
import VitalsCard from './../../components/vitalscard';
import { PrismaClient } from '@prisma/client';
import AddVital from '../../components/addvital';
import { useState } from 'react';

const prisma = new PrismaClient();

const Vitals: React.FunctionComponent<any> = ({ vitals }) => {
  const [showAddFoodModal, setShowAddVitalsModal] = useState(false);

  return (
    <div>
      <div className={styles.breadcrumbs}>
        <div>
          <h2>Vitals</h2>
        </div>

        <div>
          <button
            className="btn"
            style={{
              paddingLeft: '15px',
              paddingRight: '15px',
              fontWeight: '500'
            }}
            onClick={() => setShowAddVitalsModal(pV => !pV)}
          >
            Add Vital
          </button>
        </div>
      </div>

      <div className={styles.activities}>
        {vitals?.map(vital => (
          <VitalsCard vital={vital} key={vital.id} />
        ))}
      </div>

      {showAddFoodModal ? (
        <AddVital closeModal={() => setShowAddVitalsModal(false)} />
      ) : null}
    </div>
  );
};

export async function getServerSideProps() {
  const vitals = await prisma.vital.findMany();
  const serializedVitals = vitals.map(vital => {
    return { ...vital, timestamp: vital.timestamp.toString() as any };
  });

  return {
    props: {
      vitals: serializedVitals
    }
  };
}

export default Vitals;
