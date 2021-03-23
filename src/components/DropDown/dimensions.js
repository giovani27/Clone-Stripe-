import React, { useCallback, useLayoutEffect, useState } from "react";

const getDimensions = (Element) => Element.getBoundingClientRect();

export function useDimensions(responsive = true) {
  const [Dimensions, setDimensions] = useState(null);
  const [Element, setElement] = useState(null);

  const hook = useCallback((e) => setElement(e), []);

  useLayoutEffect(() => {
    if (Element) {
      const updateDimensions = () => {
        window.requestAnimationFrame(() => {
          setDimensions(getDimensions(Element));
        });
      };
      updateDimensions();

      if (responsive) {
        window.addEventListener("resize", updateDimensions);
        return () => {
          window.removeEventListener("resize", updateDimensions);
        };
      }
    }
  }, [Element, hook, responsive]);

  return [hook, Dimensions, Element];
}
