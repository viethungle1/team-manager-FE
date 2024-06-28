import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../fireBase/Config"
import {useState} from "react";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import axios from "axios";

export function CreatePlayer() {
    const [, setProfileUrl] = useState(undefined);
    const [, setProfileName] = useState('');
    const [player] = useState({});

    const uploadFile = (profile) => {
        if (profile === null) return
        const profileRef = ref(storage, `FM/${profile.name}`);
        uploadBytes(profileRef, profile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setProfileUrl(url);
                setProfileName(profile.name);
                player.url = url;
                localStorage.setItem("url", url);
            });
        });
    };

    return (
        <>
            <Formik initialValues={{
                name: "",
                positions: [
                    {
                        id: 1
                    }
                ],
                nation: {
                    id: 1
                },
                height: "",
                weight: "",
                salary: "",
                profile: "",
                pace: "",
                shooting: "",
                passing: "",
                agility: "",
                defending: "",
                physical: "",
                doB: ""
            }} onSubmit={(value) => {
                value.profile = localStorage.getItem("url");
                axios.post("http://localhost:8080/players/create", value).then(()=>{
                    console.log(value)
                    toast.success("Tạo thông tin cầu thủ thành công", {
                        autoClose: 700
                    });
                })
            }}>
            <Form>
                <div>
                    <label htmlFor="name">Name</label>
                    <Field name="name" type="text"/>
                </div>
                <div>
                    {/*position*/}
                </div>
                <div>
                    {/*nation*/}
                </div>
                <div>
                    <label htmlFor="height">Height</label>
                    <Field name="height" type="number"/>
                </div>
                <div>
                    <label htmlFor="weight">Weight</label>
                    <Field name="weight" type="number"/>
                </div>
                <div>
                    <label htmlFor="salary">Salary</label>
                    <Field name="salary" type="number"/>
                </div>
                <div>
                    <span className="text-f">Tải profile</span>
                    <input type="file"
                           id="custom-file-upload2" onChange={(event) => {
                        uploadFile(event.target.files[0])
                    }}/>
                </div>
                <div>
                    <label htmlFor="pace">Pace</label>
                    <Field name="pace" type="number" min="1" max="100"/>
                </div>
                <div>
                    <label htmlFor="shooting">Shooting</label>
                    <Field name="shooting" type="number" min="1" max="100"/>
                </div>
                <div>
                    <label htmlFor="passing">Passing</label>
                    <Field name="passing" type="number" min="1" max="100"/>
                </div>
                <div>
                    <label htmlFor="agility">Agility</label>
                    <Field name="agility" type="number" min="1" max="100"/>
                </div>
                <div>
                    <label htmlFor="defending">Defending</label>
                    <Field name="defending" type="number" min="1" max="100"/>
                </div>
                <div>
                    <label htmlFor="physical">Physical</label>
                    <Field name="physical" type="number" min="1" max="100"/>
                </div>
                <button type={"submit"}>Tạo</button>
            </Form>
            </Formik>
        </>
    )
}