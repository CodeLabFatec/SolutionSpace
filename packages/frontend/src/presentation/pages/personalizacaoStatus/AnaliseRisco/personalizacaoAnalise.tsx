import { useState } from "react";
import Styles from "./personalizacaoStatusStyles.scss";
import { useNavigate } from "react-router-dom";
import { FormGroup, Switch } from "@mui/material";

import { useAlert } from "@/main/services";
import ColorPicker from "@/presentation/components/colorPicker/colorPicker";
import { Avaliacao } from "@/main/types";

const PersonalizacaoAnalise: React.FC = () => {
  const navigate = useNavigate();

  const [avaliacao0,setAvaliacao0] = useState<Avaliacao>({ Nota: '0', Status: '', Cor: '#312fa2', Arquiva: false } as Avaliacao)
  const [avaliacao1,setAvaliacao1] = useState<Avaliacao>({ Nota: '1', Status: '', Cor: '#312fa2', Arquiva: false } as Avaliacao)
  const [avaliacao2,setAvaliacao2] = useState<Avaliacao>({ Nota: '2', Status: '', Cor: '#312fa2', Arquiva: false } as Avaliacao)
  const [avaliacao3,setAvaliacao3] = useState<Avaliacao>({ Nota: '3', Status: '', Cor: '#312fa2', Arquiva: false } as Avaliacao)

  const alert = useAlert();

  return (
    <div className={Styles.container}>
      <div className={Styles.tableContainer}>
        <div className={Styles.title}>
          <h1>Status de análise de risco</h1>
          <hr />
        </div>
        <div className={Styles.tableTeams}>
          <table className={Styles.table}>
            <thead>
              <tr className={Styles.headRow}>
                <td>Nota</td>
                <td>Status</td>
                <td>Cor</td>
                <td>Arquiva automaticamente?</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0</td>
                <td>
                  <input
                    type="text"
                    value={avaliacao0.Status}
                    onChange={(e: any) => {
                      avaliacao0.Status = e.target.value;
                    }}
                    className={Styles.textoNota}
                    maxLength={25}
                    placeholder="Editar texto do chamado"
                  />
                </td>
                <td className={Styles.main}>
                  <ColorPicker value={avaliacao0.Cor} />
                </td>
                <td>
                  <FormGroup id={Styles.switch}>
                    <Switch
                      value={avaliacao0.Arquiva}
                      onChange={() => {
                        avaliacao0.Arquiva = !avaliacao0.Arquiva
                      }}
                      id={Styles.switch}
                    />
                  </FormGroup>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <input
                    type="text"
                    value={avaliacao1.Status}
                    onChange={(e: any) => {
                      avaliacao1.Status = e.target.value;
                    }}
                    className={Styles.textoNota}
                    maxLength={25}
                    placeholder="Editar texto do chamado"
                  />
                </td>
                <td className={Styles.main}>
                  <ColorPicker value={avaliacao1.Cor} />
                </td>
                <td>
                  <FormGroup id={Styles.switch}>
                    <Switch
                      value={avaliacao1.Arquiva}
                      onChange={() => {
                        avaliacao1.Arquiva = !avaliacao1.Arquiva
                      }}
                      id={Styles.switch}
                    />
                  </FormGroup>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <input
                    type="text"
                    value={avaliacao2.Status}
                    onChange={(e: any) => {
                      avaliacao2.Status = e.target.value;
                    }}
                    className={Styles.textoNota}
                    maxLength={25}
                    placeholder="Editar texto do chamado"
                  />
                </td>
                <td className={Styles.main}>
                  <ColorPicker value={avaliacao2.Cor} />
                </td>
                <td>
                  <FormGroup id={Styles.switch}>
                    <Switch
                     value={avaliacao2.Arquiva}
                     onChange={() => {
                       avaliacao2.Arquiva = !avaliacao2.Arquiva
                     }}
                      id={Styles.switch}
                    />
                  </FormGroup>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  <input
                    type="text"
                    value={avaliacao3.Status}
                    onChange={(e: any) => {
                      avaliacao3.Status = e.target.value;
                    }}
                    className={Styles.textoNota}
                    maxLength={25}
                    placeholder="Editar texto do chamado"
                  />
                </td>
                <td className={Styles.main}>
                  <ColorPicker value={avaliacao3.Cor} />
                </td>
                <td>
                  <FormGroup id={Styles.switch}>
                    <Switch
                      value={avaliacao3.Arquiva}
                      onChange={() => {
                        avaliacao3.Arquiva = !avaliacao3.Arquiva
                      }}
                      id={Styles.switch}
                    />
                  </FormGroup>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PersonalizacaoAnalise;
