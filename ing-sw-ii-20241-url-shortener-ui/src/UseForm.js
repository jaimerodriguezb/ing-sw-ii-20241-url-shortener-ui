import { useState } from "react";

const useForm = () => {
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event, url) => {
        event.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch(`http://localhost:5000/url/shorten?url=${encodeURIComponent(url)}`, {
                method: 'GET'
            });

            const result = await response.json();

            if (response.ok) {
                setStatus("success");
                setMessage(result.result);
            } else {
                setStatus("error");
                setMessage(result.error || "Something went wrong");
            }
        } catch (error) {
            setStatus("error");
            setMessage(error.message || "Something went wrong");
        }
    };

    return { handleSubmit, status, message };
};

export default useForm;
