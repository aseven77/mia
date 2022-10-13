<?php
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->isSMTP();                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru'; 
$mail->SMTPAuth = true;
$mail->Username = 'test.mail.site@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'uyTT-rOIuu29'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->isHTML(true);
$mail->setFrom('test.mail.site@mail.ru'); // от кого будет уходить письмо?


$mail->addAddress('aseven77@mail.ru');
$mail->addAddress('aseven771@gmail.com');
$mail->addAddress('info-raisart@yandex.ru');

uyTT-rOIuu29


test.mail.site

$c = true;
$mail->Subject = 'Заявка с сайта Мия';


	foreach ( $_POST as $key => $value ) {
		if ( $value != "" && !is_array($value) && $key != "project_name" && $key != "admin_email" && $key != "form_subject" ) {
			$message .= "
			" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
				<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
			</tr>
			";
		}
		if (is_array($value)) {
			foreach ( $value as $key2 => $value2 ) {
				$message .= "
				" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
					<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
					<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value2</td>
				</tr>
				";
			}
		}
	}

$mail->Body = "<table style='width: 100%;'>$message</table>";

$mail->AltBody = '';

echo $mail;

if($_POST['name'] != "") {
} else {
	if (!$mail->send()) {
		echo 'Error';
		echo $mail->ErrorInfo;
	} else {
		header('location: /index.html');
	}
}
?>
