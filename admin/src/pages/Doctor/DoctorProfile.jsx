import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";

const DoctorProfile = () => {
  const [isEdit, setIsEdit] = useState(false)
  return (
    <div>
    <Card sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <CardMedia
        component="img"
        sx={{
          width: '100%',
          maxWidth: 256, 
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }}
        alt="Profile"
        src={''}
      />

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: 3,
          backgroundColor: '#ffffff'
        }}
      >
        {/* Doc Info: name, degree, experience */}
        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 2, color: '#4B4B4B' }}>
          Dr. Test
        </Typography>

        <div sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 1 }}>
          <Typography variant="body2" sx={{ color: '#757575' }}>
            MBBS - Sycastrist
          </Typography>
          <Button variant="outlined" size="small" sx={{ paddingY: 0.5, paddingX: 2, borderRadius: '9999px' }}>
            5 years
          </Button>
        </div>

        {/* Doc About */}
        <div>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 500, color: '#262626', marginTop: 3 }}>
            About:
          </Typography>
          <Typography variant="body2" sx={{ color: '#757575', maxWidth: 700, marginTop: 1 }}>
            {isEdit ? (
              <TextField
                value={''}
                multiline
                rows={8}
                fullWidth
                variant="outlined"
              />
            ) : (
              'No information available'
            )}
          </Typography>
        </div>

        {/* Appointment Fee */}
        <Typography variant="body2" sx={{ color: '#757575', fontWeight: 500, marginTop: 4 }}>
          Appointment fee:{" "}
          <span sx={{ color: '#424242' }}>
            $
            {isEdit ? (
              <TextField
                type="number"
                value={'10'}
                variant="outlined"
                size="small"
              />
            ) : (
              '10'
            )}
          </span>
        </Typography>

        {/* Address */}
        <div sx={{ display: 'flex', gap: 2, paddingY: 2 }}>
          <Typography variant="body2">Address:</Typography>
          <Typography variant="body2" sx={{ color: '#757575', fontSize: '0.875rem' }}>
            {isEdit ? (
              <TextField
                type="text"
                value={''}
                fullWidth
                variant="outlined"
                size="small"
              />
            ) : (
              'Not available'
            )}
            <br />
            {isEdit ? (
              <TextField
                type="text"
                value={''}
                fullWidth
                variant="outlined"
                size="small"
              />
            ) : (
              'Not available'
            )}
          </Typography>
        </div>

        {/* Available Checkbox */}
        <div sx={{ display: 'flex', gap: 1, paddingTop: 2 }}>
          <FormControlLabel
            control={<Checkbox checked={true} />}
            label="Available"
          />
        </div>

        {/* Edit/Save Button */}
        {isEdit ? (
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ marginTop: 3 }}
            fullWidth
          >
            Save
          </Button>
        ) : (
          <Button
            onClick={() => setIsEdit((prev) => !prev)}
            variant="outlined"
            color="primary"
            size="small"
            sx={{ marginTop: 3 }}
            fullWidth
          >
            Edit
          </Button>
        )}
      </CardContent>
    </Card>
  </div>
  );
};

export default DoctorProfile;
