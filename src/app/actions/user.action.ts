import { User } from '../models/User';
import { Auth } from '../models/User';
import { Product } from '../models/User';

export class AddUser {
    static readonly type = '[User] Add';

    constructor(public payload: User){ }
}

export class RemoveUser {
    static readonly type = '[User] Remove';
    constructor(public payload: string){ }
}

export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: Auth){ }
}

export class AddToCart {
    static readonly type = 'Add_To_Cart';
    constructor(public payload: Product){ }
}

export class RemoveFromCart {
    static readonly type = 'Remove_From_Cart';
    constructor(public payload: Product){ }
}

export class UpdateCart {
    static readonly type = 'Update_Cart';
    constructor(public payload: Product) {}
}

export class ClearProduct {
    static readonly type = 'Clear_Product';
    constructor(public payload: Product) {}
}

