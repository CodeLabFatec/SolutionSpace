import Swal from "sweetalert2"

const useAlert = () => {

    const defaultSweetAlertOptions = {
        title: 'Aviso',
        html: '',
        icon: '',
        confirmButtonText: 'OK',
        width: "350px",
        background: "#FAF0E6",
        color: "#000",
        confirmButtonColor: "#4FB4BC",
    }

    const defaultSweetAlertConfirmationOptions = {
        html: 'Deseja confirmar essa ação?',
        title: 'Aviso',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        confirmButtonColor: '#4FB4BC',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#A9A9A9',
        width: '350px',
        background:'#FAF0E6',
        color: '#000',
        reverseButtons: true
    }

    const _createAlertMessage = (alertOptions: any) => {
        return new Promise((resolve, reject) => {
            Swal.fire({
                icon: (alertOptions.icon) || defaultSweetAlertOptions.icon,
                title: (alertOptions.title || defaultSweetAlertOptions.title),
                html: (alertOptions.html || defaultSweetAlertOptions.html),
                confirmButtonText: (alertOptions.confirmButtonText || defaultSweetAlertOptions.confirmButtonText),
                width: (alertOptions.width || defaultSweetAlertOptions.width),
                background: (alertOptions.background || defaultSweetAlertOptions.background),
                color: (alertOptions.color || defaultSweetAlertOptions.color),
                confirmButtonColor: (alertOptions.confirmButtonColor || defaultSweetAlertOptions.confirmButtonColor),
            }).then((result) => {
                if(alertOptions.confirmAction) alertOptions.confirmAction()
            })
        })
    }

    const _createConfirmationMessage = (alertOptions: any) => {
        return new Promise((resolve, reject) => {
            Swal.fire({
                html: 
                (alertOptions.html || defaultSweetAlertConfirmationOptions.html),
               
                showCancelButton: 
                (alertOptions.showCancelButton || defaultSweetAlertConfirmationOptions.showCancelButton),
               
                confirmButtonText: 
                (alertOptions.confirmButtonText || defaultSweetAlertConfirmationOptions.confirmButtonText),
               
                confirmButtonColor: 
                (alertOptions.confirmButtonColor || defaultSweetAlertConfirmationOptions.confirmButtonColor),
               
                cancelButtonText: 
                (alertOptions.cancelButtonText || defaultSweetAlertConfirmationOptions.cancelButtonText),
               
                cancelButtonColor:
                (alertOptions.cancelButtonColor || defaultSweetAlertConfirmationOptions.cancelButtonColor),

                width: 
                (alertOptions.width || defaultSweetAlertConfirmationOptions.width),
                
                background: 
                (alertOptions.background || defaultSweetAlertConfirmationOptions.background),
                
                color: 
                (alertOptions.color || defaultSweetAlertConfirmationOptions.color),
                
                reverseButtons: 
                (alertOptions.reverseButtons || defaultSweetAlertConfirmationOptions.reverseButtons)
            }).then((result) => {
                if(result.isConfirmed){
                    if(alertOptions.confirmAction) alertOptions.confirmAction()
                }
            })
        })
    }

    return {
        criarAlerta: _createAlertMessage,
        criarConfirmacao: _createConfirmationMessage
    }
}

export default useAlert