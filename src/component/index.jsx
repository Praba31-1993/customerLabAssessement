import React, {useEffect} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Link from '@mui/material/Link';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TransitionsModal() {
    const [open, setOpen] = React.useState(false);
    const [segmentName, setSegmentName] = React.useState("")
    const [segmentValue, setsegmentValue] = React.useState('');
    const [inputBox, setInputBox] = React.useState([0])
    const [totalSegment, setTotalSegment] = React.useState([])
    const [finalSchema, setFinalSchema] = React.useState([])


    const UserDatas = [
        { label: "First Name", value: "Rahul" },
        { label: "Last Name", value: "J" },
        { label: "Gender", value: "male" },
        { label: "Age", value: "25" },
        { label: "Account Name", value: "SBI(saving account)" },
        { label: "City", value: 'chennai' },
        { label: "State", value: "tamilnadu" }
    ];

    useEffect(()=>{
        handleFinal()
    },[finalSchema])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (event) => {
        const selectedIndex = event.target.value;
        setsegmentValue(UserDatas[selectedIndex].value);
        let newTotalSegment = [...totalSegment]
        newTotalSegment.push(UserDatas[selectedIndex])
        setTotalSegment(newTotalSegment)

    };

    const handleSubmit = ()=>{
            
        const FinalSegmentResult = {
            "segment_name": segmentName,
            "schema": totalSegment.map(item => ({ [item.label]: item.value }))
        };
        const updatedFinalSchema = [...finalSchema, FinalSegmentResult];
        setFinalSchema(updatedFinalSchema);
        handleFinal()
    }

    const handleFinal = ()=>{
        console.log('final', finalSchema);
    }
    const addSegment = () =>{
            const existingSegment = [...inputBox];
        let newArray = []
        existingSegment.push(newArray)
        setInputBox(existingSegment)

    }
    return (
        <div>
            <Button onClick={handleOpen}>Save Segment</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            <TextField id="outlined-basic" label="Enter the Name of the Segment" variant="outlined" fullWidth
                                onChange={(e) => setSegmentName(e.target.value)}
                                value={segmentName}
                            />
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2, height: 'auto', width: '100%', border: '1px solid blue', padding:'10px' }}>
                            {inputBox.map((inputItem) => (
                                <div style={{margin:'10px'}}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Segment</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={segmentValue.value}
                                            label="Segment"
                                            onChange={handleChange}
                                        >
                                            {UserDatas.map((data, index) => (
                                                <MenuItem key={index} value={index}>{data.value}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                </div>
                            ))}

                        </Typography>


                        <Link
                            component="button"
                            variant="body2"
                            sx={{ marginTop: '20px' }}
                            onClick={addSegment}
                        >
                            + Add new schema
                        </Link>
                        <Typography id="transition-modal-description" sx={{ mt: 2, display: 'flex', gap: '2em' }}>
                            <Button variant='outlined' onClick={handleSubmit}>Save the Segment</Button>
                            <Button variant='contained' onClick={handleClose}>Cancel</Button>
                        </Typography>

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}