import { useState } from "react";

const Test = () => {
  const [state, setState] = useState({
    name: "Walter White",
    error: "",
    success: "",
    character: null,
  });

  const { name, character, loading, success, error } = state;

  const handleChange = (e, key) => {
    setState({ ...state, [key]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetCharacter();
    setState({ ...state, loading: true });

    const url = new URL("https://www.breakingbadapi.com/api/characters");

    name && url.searchParams.append("name", name);

    try {
      const response = await fetch(url);

      const data = await response.json();

      // With that console log im checking if mocked fetch in unit tests works and is returning proper data
      // console.log("DATA: ", data);

      setState({
        ...state,
        success: "Your results!",
        character: data[0],
        loading: false,
      });
    } catch (error) {
      console.log(error);

      setState({
        ...state,
        error: "Something has fucked up",
        character: null,
        loading: false,
      });
    }
  };

  const resetCharacter = () => {
    setState({ ...state, success: "", error: "", character: null });
  };

  const form = () => {
    return (
      <div>
        <h2>Find your favorite Breaking Bad character!</h2>

        <form onSubmit={handleSubmit}>
          <input
            data-testid="input"
            type="text"
            value={name}
            name="name"
            placeholder="name"
            onChange={(e) => {
              handleChange(e, "name");
            }}
          />

          <button type="submit">Submit</button>
        </form>

        <br />

        <button
          onClick={() => {
            resetCharacter();
          }}
        >
          Reset character
        </button>
      </div>
    );
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {success && <p>Success</p>}

      {name === "dupa" && <p>YEAH!</p>}

      {form()}

      {character && character.name && (
        <div>
          <p>
            Name: <b>{character.name}</b>
          </p>
          <p>
            Birthday: <b>{character.birthday}</b>
          </p>
          <p>
            Nickname: <b>{character.nickname}</b>
          </p>
          <p>
            Portrayted: <b>{character.portrayed}</b>
          </p>
          <p>
            Occupation: <b>{character.occupation[0]}</b>
          </p>
          <img src={character.img} height="400" />
        </div>
      )}
    </div>
  );
};

export { Test };
