import React, {FC, ReactNode, useState} from "react";
import classes from "./ModalWIndow.module.scss"


const Modal:FC<{children:ReactNode,  visible:boolean, setVisible: ReturnType<typeof useState<boolean>>[1] }> = ({children,setVisible, visible})=>{
    return (
        <>
            <button className={classes.open__btn} onClick={()=>setVisible(true)}>✨ Открыть окно</button>

            {/*{visible &&*/}
        <div className={`${classes.overlay} ${classes.animated} ${visible ? classes.show: ""}`}>
            <div className={classes.modal__container}>
                <div onClick={()=>setVisible(false)} className={classes.close__btn}>+</div>
                <div className={classes.inner}>
                    {children}
                </div>
            </div>
        </div>
        </>
    )
}

const ModalWindow:FC = () => {
    const [visible, setVisible] = useState(false)



    return (

      <div className={classes.container}>
          <Modal visible={visible} setVisible={setVisible as any}>
              <img src={"https://media.tenor.com/IErQHBRt6GIAAAAd/leonardo-dicaprio.gif"} alt={"ди"}/>
          </Modal>
      </div>
  )
}

export default ModalWindow;