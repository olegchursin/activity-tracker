import { useRef, useState } from 'react';
import axios from 'axios';

const AddVital = ({ closeModal }) => {
  const [disable, setDisable] = useState(false);
  const formRef = useRef();

  async function addNewVital() {
    setDisable(true);
    const { AddVitalName, AddVitalTimestamp, AddVitalValue } =
      formRef.current as any;

    const name = AddVitalName.value;
    const value = parseFloat(AddVitalValue.value);
    const timestamp = new Date(AddVitalTimestamp.value);

    await axios.post('/api/addVital', {
      name,
      value,
      timestamp
    });
    setDisable(false);
    window.location.reload();
  }

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={() => closeModal()}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add Vital</h3>
          <span
            style={{ padding: '10px', cursor: 'pointer' }}
            onClick={() => closeModal()}
          >
            X
          </span>
        </div>
        <div className="modal-body content">
          <form ref={formRef}>
            <div style={{ display: 'flex', margin: '2px 2px 0 0' }}>
              <div
                style={{ flex: '1 1 100%', margin: '0 0 2px 5px' }}
                className="inputField"
              >
                <div className="label">
                  <label>Name</label>
                </div>
                <div>
                  <input name="AddVitalName" type="text" />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', margin: '2px 2px 0 0' }}>
              <div
                style={{ flex: '1 1 100%', margin: '0 0 2px 5px' }}
                className="inputField"
              >
                <div className="label">
                  <label>Timestamp</label>
                </div>
                <div>
                  <input
                    name="AddVitalTimestamp"
                    type="datetime-local"
                    id="activity-timestamp"
                    min="2022-06-01T00:00"
                  ></input>
                </div>
              </div>
            </div>

            <div className="inputField">
              <div className="label">
                <label>Value: </label>
              </div>
              <div>
                <input name="AddVitalValue" type="number" />
              </div>
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button style={{ marginLeft: '0' }} onClick={() => closeModal()}>
            Cancel
          </button>

          <button
            disabled={disable}
            className="btn"
            onClick={() => addNewVital()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVital;
