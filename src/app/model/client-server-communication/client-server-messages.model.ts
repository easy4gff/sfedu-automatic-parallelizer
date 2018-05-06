
export class ClientServerMessage {}

export class ClientServerMessageLoginMessage extends ClientServerMessage {
    success: boolean;
    error?: number;
}

export class ClientServerMessageLogoutMessage extends ClientServerMessage {
    success: boolean;
}
