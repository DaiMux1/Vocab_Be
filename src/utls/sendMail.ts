import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/entity/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerifyEmail(to: string, subject: string, body: any) {
    try {
      const options = {
        from: 'dai.lv183492@sis.hust.edu.vn',
        to,
        subject,
        html: body,
      };
      return await this.mailerService.sendMail(options);
    } catch (e) {
      console.log(e);
    }
  }

  getVerifyEmailTemplate(url: string, user: User) {
    return `
        <!DOCTYPE html>
        <html
          xmlns="http://www.w3.org/1999/xhtml"
          xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office"
        >
          <head>
            <title></title>
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <style type="text/css">
              #outlook a {
                padding: 0;
              }
        
              body {
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
              }
        
              table,
              td {
                border-collapse: collapse;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
              }
        
              img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
              }
        
              p {
                display: block;
                margin: 13px 0;
              }
            </style>
            <!--[if mso]>
              <noscript>
                <xml>
                  <o:OfficeDocumentSettings>
                    <o:AllowPNG />
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                  </o:OfficeDocumentSettings>
                </xml>
              </noscript>
            <![endif]-->
            <!--[if lte mso 11]>
              <style type="text/css">
                .mj-outlook-group-fix {
                  width: 100% !important;
                }
              </style>
            <![endif]-->
            <!--[if !mso]><!-->
            <link
              href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700"
              rel="stylesheet"
              type="text/css"
            />
            <style type="text/css">
              @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
            </style>
            <!--<![endif]-->
            <style type="text/css">
              @media only screen and (min-width: 480px) {
                .mj-column-per-100 {
                  width: 100% !important;
                  max-width: 100%;
                }
              }
            </style>
            <style media="screen and (min-width:480px)">
              .moz-text-html .mj-column-per-100 {
                width: 100% !important;
                max-width: 100%;
              }
            </style>
            <style type="text/css">
              @media only screen and (max-width: 480px) {
                table.mj-full-width-mobile {
                  width: 100% !important;
                }
        
                td.mj-full-width-mobile {
                  width: auto !important;
                }
              }
            </style>
          </head>
        
          <body style="word-spacing: normal; background-color: #000000">
            <div style="background-color: #000000">
              <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div
                style="
                  background: #ffffff;
                  background-color: #ffffff;
                  margin: 0px auto;
                  max-width: 600px;
                "
              >
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background: #ffffff; background-color: #ffffff; width: 100%"
                >
                  <tbody>
                    <tr>
                      <td
                        style="
                          direction: ltr;
                          font-size: 0px;
                          padding: 0px;
                          text-align: center;
                        "
                      >
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                        <div
                          class="mj-column-per-100 mj-outlook-group-fix"
                          style="
                            font-size: 0px;
                            text-align: left;
                            direction: ltr;
                            display: inline-block;
                            vertical-align: top;
                            width: 100%;
                          "
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            width="100%"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    background-color: #1a1c23;
                                    vertical-align: top;
                                    padding: 0px;
                                  "
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    width="100%"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          align="left"
                                          style="
                                            font-size: 0px;
                                            padding: 10px;
                                            word-break: break-word;
                                          "
                                        >
                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            border="0"
                                            style="
                                              color: #000000;
                                              font-family: Ubuntu, Helvetica, Arial,
                                                sans-serif;
                                              font-size: 13px;
                                              line-height: 22px;
                                              table-layout: auto;
                                              width: 100%;
                                              border: none;
                                            "
                                          >
                                            <tr>
                                              <td width="50xp"></td>
                                              <td style="width: 30px" align="center">
                                                <img
                                                  src="https://image.wof3d.io/images/lock.png"
                                                />
                                              </td>
                                              <td>
                                                <span style="color: #636978"
                                                  >Hi! If your username is not ${user.username}, please do not click the link in
                                                  the email!</span
                                                >
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#15171e" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div
                style="
                  background: #15171e;
                  background-color: #15171e;
                  margin: 0px auto;
                  max-width: 600px;
                "
              >
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background: #15171e; background-color: #15171e; width: 100%"
                >
                  <tbody>
                    <tr>
                      <td
                        style="
                          direction: ltr;
                          font-size: 0px;
                          padding: 0px;
                          padding-bottom: 20px;
                          text-align: center;
                        "
                      >
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                        <div
                          class="mj-column-per-100 mj-outlook-group-fix"
                          style="
                            font-size: 0px;
                            text-align: left;
                            direction: ltr;
                            display: inline-block;
                            vertical-align: top;
                            width: 100%;
                          "
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            width="100%"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    vertical-align: top;
                                    padding: 0px;
                                    padding-bottom: 54%;
                                  "
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    width="100%"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          align="center"
                                          style="
                                            font-size: 0px;
                                            padding: 10px 25px;
                                            word-break: break-word;
                                          "
                                        >
                                          <table
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style="
                                              border-collapse: collapse;
                                              border-spacing: 0px;
                                            "
                                          >
                                            <tbody>
                                              <tr>
                                                <td style="width: 300px">
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                          
                                        <td
                                          align="left"
                                          style="
                                            font-size: 0px;
                                            padding: 0 25px;
                                            padding-right: 50px;
                                            padding-left: 50px;
                                            word-break: break-word;
                                          "
                                        >
                                        <div
                                          style="background-color: #2d303a; height: 3px; margin-bottom: 10px;"
                                        ></div>
                                          <div
                                            style="
                                              font-family: Arial, sans-serif;
                                              font-size: 20px;
                                              font-weight: bold;
                                              line-height: 30px;
                                              text-align: left;
                                              color: #489bda;
                                            "
                                          >
                                            VERIFY YOUR VOCAB ACCOUNT
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="left"
                                          style="
                                            font-size: 0px;
                                            padding: 0 25px;
                                            padding-top: 20px;
                                            padding-right: 50px;
                                            padding-left: 50px;
                                            word-break: break-word;
                                          "
                                        >
                                          <div
                                            style="
                                              font-family: Arial, sans-serif;
                                              font-size: 20px;
                                              font-weight: bold;
                                              text-align: left;
                                              color: #747b8f;
                                            "
                                          >
                                            Welcome to Vocab App
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="left"
                                          style="
                                            font-size: 0px;
                                            padding: 0 25px;
                                            padding-left: 50px;
                                            word-break: break-word;
                                            padding-top: 10px;
                                          "
                                        >
                                          <div
                                            style="
                                              font-family: Arial, sans-serif;
                                              font-size: 11.8px;
                                              text-align: left;
                                              color: white;
                                            "
                                          >
                                            You registered a game account, please click
                                            here:
                                            <a
                                              class="link-nostyle"
                                              href=${url}
                                              style="color: #148eff"
                                              target="_blank"
                                              >Verify Vocab </a
                                            >
                                            to verify your account.
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="left"
                                          style="
                                            font-size: 0px;
                                            padding: 0 25px;
                                            padding-right: 50px;
                                            padding-left: 50px;
                                            word-break: break-word;
                                            padding-top: 10px;
                                          "
                                        >
                                          <div
                                            style="
                                              font-family: Arial, sans-serif;
                                              font-size: 11.8px;
                                              line-height: 1;
                                              text-align: left;
                                              color: white;
                                            "
                                          >
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="left"
                                          style="
                                            font-size: 0px;
                                            padding: 0 25px;
                                            padding-top: 10px;
                                            padding-right: 50px;
                                            padding-left: 50px;
                                            word-break: break-word;
                                          "
                                        >
                                          <div
                                            style="
                                              font-family: Arial, sans-serif;
                                              font-size: 11.8px;
                                              line-height: 1;
                                              text-align: left;
                                              color: white;
                                            "
                                          >
                                    
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
              <div
                style="
                  background: #ffffff;
                  background-color: #ffffff;
                  margin: 0px auto;
                  max-width: 600px;
                "
              >
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background: #ffffff; background-color: #ffffff; width: 100%"
                >
                  <tbody>
                    <tr>
                      <td
                        style="
                          direction: ltr;
                          font-size: 0px;
                          padding: 0px;
                          text-align: center;
                        "
                      >
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                        <div
                          class="mj-column-per-100 mj-outlook-group-fix"
                          style="
                            font-size: 0px;
                            text-align: left;
                            direction: ltr;
                            display: inline-block;
                            vertical-align: top;
                            width: 100%;
                          "
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            width="100%"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    background-color: #1a1c23;
                                    vertical-align: top;
                                    padding: 0px;
                                  "
                                >
                                  <table
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    width="100%"
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          align="center"
                                          style="
                                            font-size: 0px;
                                            padding: 30px 30px 0 30px;
                                            word-break: break-word;
                                          "
                                        >
                                          <div
                                            style="
                                              font-family: Arial, sans-serif;
                                              font-size: 10px;
                                              line-height: 1;
                                              text-align: center;
                                              color: #636978;
                                            "
                                          >
                                        
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          align="center"
                                          style="
                                            font-size: 0px;
                                            padding: 0 25px;
                                            padding-bottom: 15px;
                                            padding-top: 10px;
                                            word-break: break-word;
                                          "
                                        >
                                        
                                      </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <!--[if mso | IE]></td></tr></table><![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!--[if mso | IE]></td></tr></table><![endif]-->
            </div>
          </body>
        </html>
      `;
  }

  getForgotPassTemplate(url: string, user: User) {
    return url;
  }
}