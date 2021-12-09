import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ImageUpload from '../misc/ImageUpload';
import Spinner from '../misc/Spinner';

export const InputRow = ({ name, input }) => {
  return (
    <tr>
      <td className="text-right pt-2" style={{ maxWidth: 200, minWidth: 100 }}>
        <h5>{name}</h5>
      </td>
      <td>
        <div
          style={{ maxWidth: 450, minWidth: 300 }}
          className="row justify-content-start ml-0"
        >
          {input}
        </div>
      </td>
    </tr>
  );
};

class PostAddLoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValue: '',
      photos: [],
      selectedFiles: null,
      isLoading: false,
      isNumber: false,
      isTitle: false,
      isDescription: false,
      isPrice: false,
      categories: [{ _id: 1, name: 'Šaldytuvas' }],
      features: [{}],
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.nameAppoint = this.nameAppoint.bind(this);
  }

  handleDropdownChange(e) {
    this.setState({ selectValue: e.target.value });
  }

  handleFiles = (files) => {
    this.setState({ photos: files });
  };

  nameAppoint(event) {
    let ph = [];
    for (let i = 0; i < event.data.locationArray.length; i++) {
      ph.push(event.data.locationArray[i]);
    }
    this.setState({ photos: ph });
  }

  render() {
    return (
      <div id="container-wrapper" className="container-wrapper">
        <div
          style={{ width: 'auto' }}
          id="container-inner"
          className="container-inner medium"
        >
          <div className="container">
            <h1 className="row justify-content-center">Pridėti skelbimą</h1>
            <table className="table table-borderless table-sm">
              <tbody>
                <InputRow
                  name="Pavadinimas "
                  input={
                    <input
                      required
                      type="text"
                      className="form-control"
                      ref={(input) => (this.getTitle = input)}
                      placeholder="Įveskite pavadinimą"
                    />
                  }
                />
                <InputRow
                  name="Aprašymas "
                  input={
                    <textarea
                      required
                      rows="5"
                      className="form-control"
                      ref={(input) => (this.getDescription = input)}
                      cols="28"
                      placeholder="Įveskite aprašymą"
                    />
                  }
                />
                <InputRow
                  name="Kaina "
                  input={
                    <input
                      required
                      type="text"
                      className="form-control"
                      ref={(input) => (this.getPrice = input)}
                      placeholder="Įveskite kainą eurais"
                    />
                  }
                />
                <InputRow
                  name="Kategorija "
                  input={
                    <select id="dropdown" className="form-control">
                      <option value="">------------</option>
                      <option value="">Automobiliai</option>
                      <option value="">Buitinė technika</option>
                      <option value="">Knygos</option>
                    </select>
                  }
                />

                <InputRow
                  name="Telefono numeris"
                  input={
                    <input
                      type="text"
                      className="form-control"
                      ref={(input) => (this.getPhoneNumber = input)}
                      placeholder="Įveskite telefono numerį"
                    />
                  }
                />
              </tbody>
            </table>
            <div>
              <h2 className="text-center">Nuotraukos</h2>
              <ImageUpload onDrop={this.handleFiles} multiple={true} />
              {this.state.isLoading ? (
                <Spinner />
              ) : (
                <button
                  onClick={() => {
                    this.handleSubmit();
                  }}
                  className="mt-4 btn btn-lg btn-primary"
                >
                  Pridėti skelbimą
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PostAddLoggedIn;
