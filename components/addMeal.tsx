import { useRef, useState } from 'react';
import axios from 'axios';

const AddMeal = ({ closeModal }) => {
  const [disable, setDisable] = useState(false);
  const formRef = useRef();

  async function addMeal() {
    setDisable(true);
    const { addMealName, addMealTimestamp, addMealDescription } =
      formRef.current as any;

    const name = addMealName.value;
    const description = addMealDescription.value;
    const timestamp = new Date(addMealTimestamp.value);

    await axios.post('/api/addMeal', {
      name,
      description,
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
          <h3>Add Meal</h3>
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
                  <input name="addMealName" type="text" />
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
                    name="addMealTimestamp"
                    type="datetime-local"
                    id="meal-timestamp"
                    min="2022-06-01T00:00"
                  ></input>
                </div>
              </div>
            </div>

            <div className="inputField">
              <div className="label">
                <label>Description</label>
              </div>
              <div>
                <textarea name="addMealDescription" data-type="text"></textarea>
              </div>
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button style={{ marginLeft: '0' }} onClick={() => closeModal()}>
            Cancel
          </button>

          <button disabled={disable} className="btn" onClick={() => addMeal()}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMeal;
