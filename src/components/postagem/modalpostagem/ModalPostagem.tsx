import Popup from "reactjs-popup";
import FormPostagem from "../formpostagem/FormPostagem";

function ModalPostagem() {
    return(
        <>
            <Popup trigger ={
                    <button className="border rounded px-4 py-2 hover:bg-white hover:text-green-600">
                        Nova Postagem
                    </button>
                }
                modal
                contentStyle={{
                    borderRadius: '1rem',
                    paddingBottom: '2rem'
                }}
            >
                <FormPostagem/>
            </Popup>
        </>
    )
}

export default ModalPostagem;