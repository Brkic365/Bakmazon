import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./Sidebar.scss";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(20),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));

const Sidebar = () => {

    const classes = useStyles();

    const min = 0;
    const max  = 1000;

    const onChange = (min,max) => {
        return;
    }
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

  // Get min and max values when their state changes
  useEffect(() => {
    onChange(minVal, maxVal );
  }, [minVal, maxVal, onChange]);

  return (
    <div className="sidebar">
        <div className="price-range">
            <h4>Price Range</h4>
            <div>
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
        <div className={classes.root}>
            <Accordion style={{ margin: 0 }} defaultExpanded>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>Categories</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ borderTop: "solid", borderTopColor: "rgb(210,210,210)", borderTopWidth: "2px"}}>
            <Typography>
                <ul className="categories">
                    <li className="list">
                        <h5>Hats</h5>
                        <input type="checkbox" id="cbtest" />
                        <label for="cbtest" class="check-box"></label> 
                    </li>
                    <li className="list">
                        <h5>Caps</h5>
                        <input type="checkbox" id="cbtest2" />
                        <label for="cbtest2" class="check-box"></label> 
                    </li>
                    <li className="list">
                        <h5>Jackets</h5>
                        <input type="checkbox" id="cbtest3" />
                        <label for="cbtest3" class="check-box"></label> 
                    </li>
                    <li className="list">
                        <h5>Sweaters</h5>
                        <input type="checkbox" id="cbtest4" />
                        <label for="cbtest4" class="check-box"></label> 
                    </li>
                    <li className="list">
                        <h5>Shirts</h5>
                        <input type="checkbox" id="cbtest5" />
                        <label for="cbtest5" class="check-box"></label> 
                    </li>
                    <li className="list">
                        <h5>Jeans</h5>
                        <input type="checkbox" id="cbtest6"/>
                        <label for="cbtest6" class="check-box"></label> 
                    </li>
                    <li className="list">
                        <h5>Swimsuits</h5>
                        <input type="checkbox" id="cbtest7" />
                        <label for="cbtest7" class="check-box"></label> 
                    </li>
                </ul>
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion style={{ margin: 0 }}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography className={classes.heading}>Colors</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
              <ul>
                <li>
                  <input type="checkbox" />
                </li>
              </ul>
            </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion style={{ margin: 0 }}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
            >
            <Typography className={classes.heading}>Materials</Typography>
            </AccordionSummary>
        </Accordion>
        <Accordion style={{ margin: 0 }}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
            >
            <Typography className={classes.heading}>Brands</Typography>
            </AccordionSummary>
        </Accordion>
        <Accordion style={{ margin: 0 }}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5a-content"
            id="panel5a-header"
            >
            <Typography className={classes.heading}>Size</Typography>
            </AccordionSummary>
        </Accordion>
        <Accordion style={{ margin: 0 }}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6a-content"
            id="panel6a-header"
            >
            <Typography className={classes.heading}>Sex</Typography>
            </AccordionSummary>
        </Accordion>
      </div>
    </div>
  );
};

export default Sidebar;
