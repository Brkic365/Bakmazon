import React, { useCallback, useEffect, useState, useRef } from "react";
import "./Sidebar.scss";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Sidebar = () => {
  const classes = useStyles();

  const colors = ["black", "brown", "blue", "green", "purple"];
  const colors_2 = ["pink", "red", "orange", "yellow", "white"];

  const min = 0;
  const max = 1000;

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="sidebar">
      <ul className="categories">
        <h3>Categories</h3>
        <li className="list">
          <button type="button">Hats</button>
          <h5>(9)</h5>
        </li>
        <li className="list">
          <button type="button">Caps</button>
          <h5>(3)</h5>
        </li>
        <li className="list">
          <button type="button">Jackets</button>
          <h5>(3)</h5>
        </li>
        <li className="list">
          <button type="button">Sweaters</button>
          <h5>(5)</h5>
        </li>
        <li className="list">
          <button type="button">Shirts</button>
          <h5>(4)</h5>
        </li>
        <li className="list">
          <button type="button">Jeans</button>
          <h5>(8)</h5>
        </li>
        <li className="list">
          <button type="button">Swimsuits</button>
          <h5>(7)</h5>
        </li>
      </ul>
      <div className="price-range">
        <h3>Price</h3>
        <div className="ranger">
          <input
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={(event) => {
              const value = Math.min(Number(event.target.value), maxVal - 1);
              setMinVal(value);
              minValRef.current = value;
            }}
            className="thumb thumb--left"
            style={{ zIndex: minVal > max - 100 && "5" }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={(event) => {
              const value = Math.max(Number(event.target.value), minVal + 1);
              setMaxVal(value);
              maxValRef.current = value;
            }}
            className="thumb thumb--right"
          />
          <div className="slider">
            <div className="slider__track" />
            <div ref={range} className="slider__range" />
            <div className="slider__left-value">${minVal}</div>
            <div className="slider__right-value">${maxVal}</div>
          </div>
        </div>
      </div>
      <div className="colors">
        <h3>Colors</h3>
        <div>
          {colors.map((color) => (
            <motion.button
              className="color"
              style={{ backgroundColor: `${color}` }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1 }}
              transition={{ duration: 0.1 }}
            ></motion.button>
          ))}
        </div>

        <div>
          {colors_2.map((color) => (
            <motion.button
              className="color"
              style={{ backgroundColor: `${color}` }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1 }}
              transition={{ duration: 0.1 }}
            ></motion.button>
          ))}
        </div>
      </div>
      <div className={classes.root}>
        <Accordion style={{ margin: 0 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Brands</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              borderTop: "solid",
              borderTopColor: "rgb(210,210,210)",
              borderTopWidth: "2px",
            }}
          >
            <Typography>
              <ul className="brands">
                <li className="list">
                  <h5>Nike</h5>
                  <input type="checkbox" id="cbtest" />
                  <label for="cbtest" class="check-box"></label>
                </li>
                <li className="list">
                  <h5>Adidas</h5>
                  <input type="checkbox" id="cbtest2" />
                  <label for="cbtest2" class="check-box"></label>
                </li>
                <li className="list">
                  <h5>Jordan</h5>
                  <input type="checkbox" id="cbtest3" />
                  <label for="cbtest3" class="check-box"></label>
                </li>
                <li className="list">
                  <h5>Puma</h5>
                  <input type="checkbox" id="cbtest4" />
                  <label for="cbtest4" class="check-box"></label>
                </li>
                <li className="list">
                  <h5>Under Armour</h5>
                  <input type="checkbox" id="cbtest5" />
                  <label for="cbtest5" class="check-box"></label>
                </li>
                <li className="list">
                  <h5>New Balance</h5>
                  <input type="checkbox" id="cbtest6" />
                  <label for="cbtest6" class="check-box"></label>
                </li>
                <li className="list">
                  <h5>Converse</h5>
                  <input type="checkbox" id="cbtest7" />
                  <label for="cbtest7" class="check-box"></label>
                </li>
                <li className="list">
                  <h5>Reebok</h5>
                  <input type="checkbox" id="cbtest8" />
                  <label for="cbtest8" class="check-box"></label>
                </li>
                <li className="list">
                  <h5>Vans</h5>
                  <input type="checkbox" id="cbtest9" />
                  <label for="cbtest9" class="check-box"></label>
                </li>
                <li className="list">
                  <h5>Yeezy</h5>
                  <input type="checkbox" id="cbtest10" />
                  <label for="cbtest10" class="check-box"></label>
                </li>
                <li className="list">
                  <h5>Timberland</h5>
                  <input type="checkbox" id="cbtest11" />
                  <label for="cbtest11" class="check-box"></label>
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ margin: 0 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Sex</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              borderTop: "solid",
              borderTopColor: "rgb(210,210,210)",
              borderTopWidth: "2px",
            }}
          >
            <Typography>
              <ul className="brands">
                <li className="list">
                  <h5>Men</h5>
                  <input type="checkbox" id="cbtest12" />
                  <label for="cbtest12" class="check-box"></label>
                </li>
                <li className="list">
                  <h5>Women</h5>
                  <input type="checkbox" id="cbtest13" />
                  <label for="cbtest13" class="check-box"></label>
                </li>
                <li className="list">
                  <h5>Dreamgender</h5>
                  <input type="checkbox" id="cbtest14" />
                  <label for="cbtest14" class="check-box"></label>
                </li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Sidebar;
