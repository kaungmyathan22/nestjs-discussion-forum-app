import { Process, Processor } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { EnvironmentConstants } from 'src/common/constants/environment.constants';
import { ProcessorType } from 'src/common/constants/process.constants';
import { QueueConstants } from 'src/common/constants/queue.constants';
import { EmailService } from 'src/features/email/email.service';
import { UserEntity } from 'src/features/users/entities/user.entity';
import { TokenService } from '../services/token.service';

interface IForgotPasswordData {
  frontendURL: string;
  token: string;
  email: string;
}

@Processor(QueueConstants.emailQueue)
export class AuthEmailProcessor {
  constructor(
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}
  @Process(ProcessorType.ForgotPassword)
  async handleSendForgotPasswordEmail(job: Job<IForgotPasswordData>) {
    const { frontendURL, token, email } = job.data;
    this.emailService.sendEmail({
      to: email,
      template: 'forgot-password',
      subject: 'Password Reset Link',
      context: {
        resetLink: `${frontendURL}/?token=${token}`,
      },
    }),
      job.finished();
  }

  @Process(ProcessorType.VerificationEmail)
  async handleSendVerificationEmail(job: Job<UserEntity>) {
    const token = await this.tokenService.getEmailVerificationToken(job.data);
    const frontendURL = this.configService.get(
      EnvironmentConstants.FRONTNED_URL,
    );
    await this.emailService.sendEmail({
      to: job.data.email,
      template: 'confirmation',
      subject: 'Email Confirmation',
      context: {
        confirmationLink: `${frontendURL}/?token=${token}`,
      },
    });
    job.finished();
  }
}
