import React from 'react'

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material'

function CustomDialog(props) {
	return (
		<div>
			<Dialog
				open={props.open}
				onClose={props.close}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					Ваш город {props.city} верно?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Нажав &quot;Да&quot; вы будете перенаправлены на страницу погоды вашего города.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.disagree}>Нет</Button>
					<Button onClick={props.agree} autoFocus>
						Да
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default CustomDialog
