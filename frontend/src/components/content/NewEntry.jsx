import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { PropTypes } from "prop-types";
import { useState } from "react";

const steps = [
  "Select a word",
  "Add a translation for the word",
  "Tag people for inspection",
  "Check your input"
];

const NewEntry = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (isStepSkipped(activeStep)) {
      const newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
      setSkipped(newSkipped);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography display="block" textAlign="center" variant="caption">
                Optional
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Content activeStep={activeStep} />
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0 || activeStep === steps.length}
          onClick={handleBack}
          sx={{ mr: 1 }}
          variant="outlined"
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        {isStepOptional(activeStep) && (
          <Button
            color="inherit"
            onClick={handleSkip}
            sx={{ mr: 1 }}
            variant="outlined"
          >
            Skip
          </Button>
        )}

        <Button onClick={handleNext} variant="outlined">
          {activeStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

const Content = ({ activeStep }) => {
  switch (activeStep) {
    case 0:
      return <WordSelector />;
    default:
      return null;
  }
};

Content.propTypes = {
  activeStep: PropTypes.number
};

const WordSelector = () => {
  return <></>;
};

export default NewEntry;
