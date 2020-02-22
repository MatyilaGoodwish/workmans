<?php
//===================================//
// LayerBB Project                   //
//-----------------------------------//
// Website: https://www.layerbb.com  //
// Email: info@layerbb.com           //
// Build Series: 1.1                 //
//===================================//

/*
 * Mail Library of LayerBB
 */
if (!defined('BASEPATH')) {
    die();
}

class Library_Mail
{

    private $smtp = array();
    private $email_type = 1;
    private $client, $mail;
    public $error;

    private $to, $from, $message, $subject;

    public function __construct()
    {
        global $LAYER;
        if ($LAYER->data['mail_type'] == "1") {
            //Server's Email Server
            $this->email_type = 1;
            if (BASEPATH == "Staff") {
                require_once(PATH_A . CLA . 'mail.php');
            } else {
                require_once('applications/' . CLA . 'mail.php');
            }
            $this->client = new SimpleMail();
        } else {
            //SMTP Server
            require_once('phpmailer/PHPMailerAutoload.php');
            $this->email_type = 2;
            $this->mail = new PHPMailer;
            $this->mail->isSMTP();
            //SMTP Details
            $this->mail->Host = $LAYER->data['smtp_address'];
            $this->mali->Username = $LAYER->data['smtp_username'];
            $this->mail->Password = $LAYER->data['smtp_password'];
            $this->mail->Port = $LAYER->data['smtp_port'];
            $this->mail->SMTPSecure = 'tls';
        }
    }

    public function from($string)
    {
        $this->from = $string;
        return $this;
    }

    public function to($string)
    {
        $this->to = $string;
        return $this;
    }

    public function subject($string)
    {
        $this->subject = $string;
        return $this;
    }

    public function body($string)
    {
        global $LAYER;
        if ($this->email_type == "1") {
            $this->message = $string;
        } else {
            /*
             * Additions made to work with LayerBB
             * Added 1.3.
             */
            $template = file_get_contents('applications/commands/mail/default.php');
            $template = str_replace(
                array(
                    '%site_name%',
                    '%site_url%',
                    '%content%'
                ),
                array(
                    $LAYER->data['site_name'],
                    SITE_URL,
                    $string
                ),
                $template
            );
            $this->message = str_replace("\n.", "\n..", $template);
        }
        return $this;
    }

    public function send()
    {
        global $LAYER;
        if ($this->email_type == "1") {
            $from = ($this->from == $LAYER->data['site_email']) ? $LAYER->data['site_name'] : $this->from;
            $send = $this->client->setTo($this->to, $this->to)
                ->setFrom($this->from, $from)
                ->setSubject($this->subject)
                ->addGenericHeader('X-Mailer', 'PHP/' . phpversion())
                ->addGenericHeader('Content-Type', 'text/html; charset="utf-8"')
                ->setMessage($this->message)
                ->send();
            if ($send) {
                return true;
            } else {
                return false;
            }
        } else {
            $this->mail->From = $this->from;
            $this->mail->FromName = ($this->from == $LAYER->data['site_email']) ? $LAYER->data['site_name'] : $this->from;
            $this->mail->addAddress($this->to, $this->to);
            $this->mail->isHTML(true);
            $this->mail->Subject = $this->subject;
            $this->mail->Body = $this->message;
            if (!$this->mail->send()) {
                $this->error = $this->mail->ErrorInfo;
                return false;
            } else {
                return true;
            }
        }
    }

}

?>