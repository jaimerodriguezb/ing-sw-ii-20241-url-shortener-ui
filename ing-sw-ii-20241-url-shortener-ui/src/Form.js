import useForm from "./UseForm";
import React, { useState } from "react";

const Form = () => {
    const { handleSubmit, status, message } = useForm();
    const [url, setUrl] = useState("");

    const handleChange = (event) => {
        setUrl(event.target.value);
    };
//Se agrega los dos IF en los cuales se verifica que tipo de mensaje retorna la API
    if (status === "success" & message === "No es posible Acortar la URL, tiene riesgos de Pishing") {
        return (
            <>
                
                <div className="text-2xl">Ups, el phishin es malo :c.</div>
                <div className="text-md">{message}</div>
                <button
                    className="mt-4 px-6 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
                    onClick={() => window.location.reload()}
                >
                    Volver al inicio y acortar URL
                </button>
            </>
        );
    }
//En caso de que la URL no tenga Pishing entonces va a retornar la URL.
    else if (status === "success" & message !== "No es posible Acortar la URL, tiene riesgos de Pishing") {
        return (
            <>
                <div className="text-2xl">URL acortada, gracias por usar nuestra app.</div>
                <div className="text-md">{'Su URL es:'}</div>
                <div className="text-md">{'http://localhost:3000/'+message}</div>
                <button
                    className="mt-4 px-6 py-2 text-white bg-blue-500 rounded shadow hover:bg-blue-600"
                    onClick={() => window.location.reload()}
                >
                    Volver al inicio y acortar URL
                </button>
            </>
        );
    }

    else if (status === "error") {
        return (
            <>
                <div className="text-2xl">Something bad happened!</div>
                <div className="text-md">{message}</div>
            </>
        );
    }

    return (
        <form
            onSubmit={(e) => handleSubmit(e, url)}
            method="GET"
        >
            <div className="pt-0 mb-3">
                <input
                    type="text"
                    placeholder="Enter URL"
                    name="url"
                    value={url}
                    onChange={handleChange}
                    className="focus:outline-none focus:ring relative w-full px-3 py-3 text-sm text-gray-600 placeholder-gray-400 bg-white border-0 rounded shadow outline-none"
                    required
                />
            </div>
            {status !== "loading" && (
                <div className="pt-0 mb-3">
                    <button
                        className="active:bg-blue-600 hover:shadow-lg focus:outline-none px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-blue-500 rounded shadow outline-none"
                        type="submit"
                    >
                        Shorten URL
                    </button>
                </div>
            )}
        </form>
    );
};

export default Form;
