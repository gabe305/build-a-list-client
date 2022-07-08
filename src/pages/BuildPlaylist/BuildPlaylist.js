import { useState } from "react";
import GuitarAnimation from "../../components/GuitarAnimation/GuitarAnimation";
import "./BuildPlaylist.scss";
import sampleImage from "../../assets/images/sample-image.svg"
import { useNavigate } from "react-router-dom"

const initialValues = {
    title: "",
    description: ""
};

function BuildPlaylist({ spotifyApi, userId }) {
    const [values, setValues] = useState(initialValues)
    const navigate = useNavigate()

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(sampleImage)
        spotifyApi.createPlaylist(values.title, {"description": values.description, "public": true}).then(res => {
            e.target.reset()
            navigate("/playlists/" + res.body.id)
        })
    }

    return (
        <section>
            <form className="build-form" onSubmit={handleSubmit}>
                <div className="build-form__input-container">
                    <label htmlFor="title" className="build-form__label">Title</label>
                    <input type="text" name="title" id="title"  className="build-form__input" onChange={handleInput}/>
                </div>
                <div className="build-form__input-container">
                    <label htmlFor="description" className="build-form__label">Description</label>
                    <textarea type="text" name="description" id="description" className="build-form__input" onChange={handleInput}/>
                </div>
                <button className="build-form__btn">Build</button>
            </form>
            <GuitarAnimation className="build-form__animation"/>
        </section>
    );
}

export default BuildPlaylist;