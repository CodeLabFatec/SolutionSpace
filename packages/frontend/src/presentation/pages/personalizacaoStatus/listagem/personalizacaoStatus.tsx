import { useContext, useEffect, useState } from "react";
import Styles from "./personalizacaoStatusStyles.scss";
import { deleteTeam, getAllTeams } from "@/main/api/api";
import { useNavigate } from "react-router-dom";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

import { AuthContext } from "@/main/contexts/authcontext";
import { useAlert } from "@/main/services";
import ColorPicker from "@/presentation/components/colorPicker/colorPicker";

const PersonalizacaoStatus: React.FC = () => {
  const navigate = useNavigate();

  const [nota0, setNota0] = useState(false);
  const [nota1, setNota1] = useState(false);
  const [nota2, setNota2] = useState(false);
  const [nota3, setNota3] = useState(false);
  const [textoNota0, setTextoNota0] = useState("");
  const [textoNota1, setTextoNota1] = useState("");
  const [textoNota2, setTextoNota2] = useState("");
  const [textoNota3, setTextoNota3] = useState("");

  const alert = useAlert();

  const handleNota0 = () => {
    setNota0(!nota0);
  };
  const handleNota1 = () => {
    setNota1(!nota1);
  };
  const handleNota2 = () => {
    setNota2(!nota2);
  };
  const handleNota3 = () => {
    setNota3(!nota3);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.tableContainer}>
        <div className={Styles.title}>
          <h1>Personalização de status</h1>
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
                    value={textoNota0}
                    onChange={(e: any) => {
                      setTextoNota0(e.target.value);
                    }}
                    className={Styles.textoNota}
                    maxLength={25}
                    placeholder="Editar texto do chamado"
                  />
                </td>
                <td className={Styles.main}>
                  <ColorPicker value={"#312fa2"} />
                </td>
                <td>
                  <FormGroup id={Styles.switch}>
                    <Switch
                      value={nota0}
                      onChange={handleNota0}
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
                    value={textoNota1}
                    onChange={(e: any) => {
                      setTextoNota1(e.target.value);
                    }}
                    className={Styles.textoNota}
                    maxLength={25}
                    placeholder="Editar texto do chamado"
                  />
                </td>
                <td className={Styles.main}>
                  <ColorPicker value={"#b92d2d"} />
                </td>
                <td>
                  <FormGroup id={Styles.switch}>
                    <Switch
                      value={nota1}
                      onChange={handleNota1}
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
                    value={textoNota2}
                    onChange={(e: any) => {
                      setTextoNota2(e.target.value);
                    }}
                    className={Styles.textoNota}
                    maxLength={25}
                    placeholder="Editar texto do chamado"
                  />
                </td>
                <td className={Styles.main}>
                  <ColorPicker value={"#1f9833"} />
                </td>
                <td>
                  <FormGroup id={Styles.switch}>
                    <Switch
                      value={nota2}
                      onChange={handleNota2}
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
                    value={textoNota3}
                    onChange={(e: any) => {
                      setTextoNota3(e.target.value);
                    }}
                    className={Styles.textoNota}
                    maxLength={25}
                    placeholder="Editar texto do chamado"
                  />
                </td>
                <td className={Styles.main}>
                  <ColorPicker value={"#a8b734"} />
                </td>
                <td>
                  <FormGroup id={Styles.switch}>
                    <Switch
                      value={nota3}
                      onChange={handleNota3}
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

export default PersonalizacaoStatus;
