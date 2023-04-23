import { InfoChamado, ChamadoLista } from "@/presentation/components";
import Styles from "./chamados-styles.scss";

import React, { useEffect, useState } from "react";
import { VisualizarChamado } from "@/main/enums";
import { ProSidebarProvider } from "react-pro-sidebar";
import { ChamadoType } from "@/main/types";

const Chamados: React.FC<{ visualizacaoChamado: VisualizarChamado }> = (
  props
) => {
  const [chamado, setChamado] = useState<ChamadoType>();
  const [width, setWidth] = useState<number>(1150);

  useEffect(() => {
    setChamado(undefined);
  }, [props]);

  return (
    <div className={Styles.container}>
      <div className={Styles.chamadosWrapper}>
        <ProSidebarProvider>
          <ChamadoLista
            visualizacaoChamado={props.visualizacaoChamado}
            chamadoState={setChamado}
            setWidht={setWidth}
            width={width}
          />
        </ProSidebarProvider>
        <div style={{ width: `${width}px`, transition: "ease 1s" }}>
          <InfoChamado
            chamado={chamado}
            visualizacaoChamado={props.visualizacaoChamado}
          />
        </div>
      </div>
    </div>
  );
};

export default Chamados;
