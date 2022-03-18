import {
  List,
  ListItemButton,
  ListItemText,
  Paper,
  TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { PropTypes } from "prop-types";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDefinition } from "../../api/words";
import { resetEntry, setSelectedWord } from "../../redux/dictionarySlice";

const steps = [
  "Select a word",
  "Add a translation for the word",
  "Tag people for inspection",
  "Check your input"
];

const NewEntry = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const selectedWord = useSelector((state) => state.dictionary.selectedWord);
  const drawerOpen = useSelector((state) => state.interface.drawerOpen);
  const drawerWidth = useSelector((state) => state.interface.drawerWidth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetEntry());
    return () => {
      dispatch(resetEntry());
    };
  }, []);

  const stepFinished = (step) => {
    switch (step) {
      case 0:
        return selectedWord ? true : false;

      default:
        return false;
    }
  };

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "fixed",
          bottom: 0,
          left: `${drawerOpen ? drawerWidth : 0}px`,
          right: 0,
          p: 3
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "80%"
          }}
        >
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

          <Button
            disabled={!stepFinished(activeStep)}
            onClick={handleNext}
            variant="outlined"
          >
            {activeStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </Box>
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
  const selectedWord = useSelector((state) => state.dictionary.selectedWord);
  const [rawWord, setRawWord] = useState(
    selectedWord ? selectedWord.headword : ""
  );
  const [word, setWord] = useState(selectedWord ? selectedWord.headword : "");
  const [definitions, setDefinitions] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [error, setError] = useState(null);
  const timeout = useRef();
  const dispatch = useDispatch();

  const onChange = (event) => {
    setRawWord(event.target.value);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setWord(event.target.value);
    }, 500);
  };

  useEffect(() => {
    setDefinitions(null);
    setRecommendations(null);
    setError(null);
    if (word) {
      fetchDefinition(word)
        .then((result) => {
          if (!result) {
            return setError("An error occurred!");
          }
          if (Array.isArray(result)) {
            if (result.every((element) => typeof element === "string")) {
              if (result.length === 0) {
                return setError("An error occurred!");
              } else {
                return setRecommendations(result);
              }
            } else {
              return setDefinitions(result);
            }
          } else {
            return setError("An error occurred!");
          }
        })
        .catch(console.warn);
    } else {
      setRecommendations(null);
    }
  }, [word]);

  const selectRecommendation = (recommendation) => {
    setRawWord(recommendation);
    setWord(recommendation);
  };

  return (
    <Box
      sx={{
        p: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Typography sx={{ margin: 1 }} variant="h4">
        Choose a word
      </Typography>
      <TextField
        error={recommendations || error ? true : false}
        helperText={
          recommendations || error
            ? recommendations
              ? "Unknown english word, did you mean:"
              : "An error occurred"
            : undefined
        }
        id="standard-basic"
        label="Choose a word"
        onChange={onChange}
        value={rawWord}
        variant="standard"
      />
      <Paper sx={{ m: "2rem" }}>
        {recommendations && (
          <List>
            {recommendations.map((recommendation) => (
              <ListItemButton
                key={recommendation}
                onClick={() => selectRecommendation(recommendation)}
              >
                {recommendation}
              </ListItemButton>
            ))}
          </List>
        )}
        {definitions && (
          <List sx={{ maxWidth: 500, p: "1rem" }}>
            {definitions.map((definition) => (
              <ListItemButton
                key={definition.uuid}
                onClick={() => dispatch(setSelectedWord(definition))}
                selected={selectedWord && selectedWord.uuid === definition.uuid}
                variant="outlined"
              >
                <ListItemText
                  primary={`${definition.headword} (${definition.type})`}
                  secondary={definition.shortdef.map((value, index) => (
                    <Fragment key={index}>
                      {value}
                      {index !== definition.shortdef.length - 1 ? "," : ""}
                      <br />
                    </Fragment>
                  ))}
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default NewEntry;
