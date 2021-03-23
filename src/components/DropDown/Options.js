import React, { useContext, useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { useDimensions } from "./dimensions";
import { Context } from "./Provider";

let lastOptionId = 0;

export function DropdownOption({ name, content: Content, backgroundHeight }) {
  const IdRef = useRef(++lastOptionId);
  const id = IdRef.current;

  const [optionsHook, optionsDimensions] = useDimensions();
  const [Register, setRegister] = useState(false);

  const {
    registerOption,
    updateOptionsProps,
    deleteOptionById,
    settargetId,
    targetId,
  } = useContext(Context);

  useEffect(() => {
    if (!Register && optionsDimensions) {
      const WrappedContent = () => {
        const contentRef = useRef();

        useEffect(() => {
          const contentDimensions = contentRef.current.getBoundingClientRect();
          updateOptionsProps(id, { contentDimensions });
        }, []);

        return (
          <div ref={contentRef}>
            <Content />
          </div>
        );
      };
      registerOption({
        id,
        optionsDimensions,
        optionCenterX: optionsDimensions.x + optionsDimensions.width / 2,
        WrappedContent,
        backgroundHeight,
      });

      setRegister(true);
    } else if (Register && optionsDimensions) {
      updateOptionsProps(id, {
        updateOptionsProps,
        optionCenterX: optionsDimensions.x + optionsDimensions.width / 2,
      });
    }
  }, [
    registerOption,
    id,
    Register,
    optionsDimensions,
    updateOptionsProps,
    deleteOptionById,
    backgroundHeight,
  ]);
  useEffect(() => deleteOptionById(id), [deleteOptionById, id]);

  const handleOpen = () => settargetId(id);
  const handleClose = () => settargetId(null);
  const handleTouch = () => (window.isMobile = true);

  const handleClick = (e) => {
    e.preventDefault();

    return targetId === id ? handleClose() : handleOpen();
  };

  return (
    <motion.button
      className="dropdown-option"
      ref={optionsHook}
      onMouseDown={handleClick}
      onHoverStart={() => !window.isMobile && handleOpen()}
      onHoverEnd={() => !window.isMobile && handleClose()}
      onTouchStart={handleTouch}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      {name}
    </motion.button>
  );
}
