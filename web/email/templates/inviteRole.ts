import * as Prisma from '@prisma/client';
import { SESV2 } from 'aws-sdk';
import { convert } from 'html-to-text';
import mjml2html from 'mjml';
import { NextkitError } from 'nextkit';
import { baseURL } from '../../../shared/api';

import { sendEmail } from '../../utils/email';
import { GenerateTemplateArgs } from '../generateTemplates';

type InviteRoleTemplateArgs = {
	inviteLink: string;
	inviterName: string;
	eventName: string;
	roleName: string;
};

export const template = `
<mjml>
  <mj-head>
    <mj-font name="Inter" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" />
  </mj-head>

  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-weight="bold" font-size="30px" color="#111827" align="center" font-family="Inter, Roboto, Arial" line-height="1.2">{{roleName}} invitation for {{eventName}}
        </mj-text>

        <mj-text font-size="16px" color="#777777" font-family="Inter, Roboto, Arial" line-height="1.4">{{inviterName}} has invited you to attend {{eventName}} as a {{roleName}}.
        </mj-text>

        <mj-text font-size="16px" color="#5C41FF" font-family="Inter, Roboto, Arial" align="center" padding-top="15px" padding-bottom="15px">
          <a href="{{inviteLink}}" target="_blank" style="text-decoration: none; background-color: #0066FF; color: #ffffff; padding: 8px 15px; border-radius: 5px;">Accept Invite</a>
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section padding="0 0 20px 0">
      <mj-column>
        <mj-divider border-color="#CDCDCD" border-width="1px" />

        <mj-text font-size="12px" color="#777777" font-family="Inter, Roboto, Arial" line-height="1.4" align="center">
          You are receiving this email because {{inviterName}} invited you to join <a href="http://localhost:5555/support" style="color: #202020; text-decoration:none;">Meetuppp</a>. If you no longer would like to receive these emails, please <a href="http://localhost:5555/settings/notifications" style="color: #202020; text-decoration:none;">unsubscribe</a>.
        </mj-text>

        <mj-image href="http://localhost:5555" target="_blank" width="120px" src="https://meetuppp-assets.s3.ap-south-1.amazonaws.com/images/logo-text.png" />
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

const htmlOutput = mjml2html(template);

const text = convert(htmlOutput.html, {
	wordwrap: 130
});

export const inviteRole: GenerateTemplateArgs = {
	textPart: text,
	htmlPart: htmlOutput.html,
	subjectPart: 'Role Invitation',
	templateName: 'RoleInvite'
};

type SendInviteRoleArgs = {
	toAddresses: string[];
	inviteCode: string;
	event: Prisma.Event;
	inviterName: string;
	role: Prisma.EventRole;
};

export const sendRoleInvite = async (args: SendInviteRoleArgs) => {
	const { toAddresses, inviteCode, inviterName, event, role } = args;

	if (toAddresses.length === 0) {
		throw new NextkitError(400, 'No recipients specified');
	}

	const templateData: InviteRoleTemplateArgs = {
		inviteLink: `${baseURL}/invites/role?code=${inviteCode}`,
		eventName: event.name,
		inviterName,
		roleName: role.name
	};

	const params: SESV2.SendEmailRequest = {
		FromEmailAddress: `"Meetuppp" <patrick.thakare123@gmail.com>`,
		ReplyToAddresses: ['"Meetuppp" <patrick.thakare123@gmail.com>'],
		Destination: {
			ToAddresses: toAddresses
		},
		Content: {
			Template: {
				TemplateData: JSON.stringify(templateData),
				TemplateName: inviteRole.templateName
			}
		}
	};

	await sendEmail(params).catch((err) => {
		throw new NextkitError(500, err);
	});
};
