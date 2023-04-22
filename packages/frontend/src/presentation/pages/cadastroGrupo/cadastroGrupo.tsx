
import Styles from "./cadastroGrupo.scss"

const CadastroGrupo : React.FC =() => {
    return(
        <div className={Styles.container}>
            <div className={Styles.H1cadastroGrupo}>
                <h1>Cadastro de grupos</h1>
                <hr/>
                <form className={Styles.formCadastroGrupo}>
                    <div className={Styles.inputGroup}>
                        <div style={ { width: '50%' } }>
                        <label htmlFor='nome'>Nome</label>  
                        <input className={Styles.inputText}maxLength={60}></input>
                        <label htmlFor='nome'>Descrição</label>  
                        <input className={Styles.inputText}maxLength={60}></input>
                        <label htmlFor='nome'>Equipe</label>  
                        <input className={Styles.inputText}maxLength={60}></input>
                        </div>

                    </div>
                

                </form>

            </div>
        </div>
    );

}
export default CadastroGrupo;