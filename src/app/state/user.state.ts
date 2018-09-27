import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User, Product } from '../models/User';
import { AddUser, RemoveUser, Login, AddToCart, RemoveFromCart, UpdateCart, ClearProduct } from '../actions/user.action';
import { AuthService } from '../shared/services/auth/auth.service';
import { tap } from 'rxjs/operators';

export class UserStateModel {
    filerts: string;
    formLabel: string;
    users: User[];
    loggedUserInfo: any;
    productList: Product[];
}

// export class ProductsStateModel {
//     productList: Product[];
// }

@State<UserStateModel>({
    name: 'users',
    defaults: {
        users: [],
        filerts: 'Show All',
        formLabel: 'Add User Form',
        loggedUserInfo: [],
        productList: []
    }
})

// @State<ProductsStateModel>({
//     name: 'shopingproduct',
//     defaults: {
//         productList: []
//     }
// })


export class UserState {
    @Selector()
    static getUsers(state: UserStateModel) {
        return state.users;
    }

    @Selector()
    static token(state: UserStateModel) {
        return state.loggedUserInfo;
    }

    constructor(private authService: AuthService) {}

    @Action(AddUser)
    add({ getState, patchState }: StateContext<UserStateModel>, { payload }: AddUser) {
        const state = getState();
        patchState({
            users: [...state.users, payload]
        });
    }

    @Action(RemoveUser)
    remove({ getState, patchState }: StateContext<UserStateModel>, { payload }: RemoveUser) {
        patchState({
            users: getState().users.filter(a => {
                a.name != payload
            })
        });
    }

    @Action(Login)
    Login({patchState}: StateContext<UserStateModel>, {payload}: Login) {
        return this.authService.login(payload)
        .pipe(
            tap((result:any) => {
                let tokenId = result;
                patchState({
                    loggedUserInfo : tokenId
                })
            })
        )
    }

    @Action(RemoveFromCart)
    removeitem({getState, patchState}: StateContext<UserStateModel>, {payload}: RemoveFromCart) {
        const state = getState();
        state.productList.splice(state.productList.findIndex(v => v._id == payload._id), 1);
    }

    @Action(AddToCart)
    save({getState, patchState}: StateContext<UserStateModel>, {payload}: AddToCart) {
        const state = getState();
        patchState({
            productList: [...state.productList, payload]
        });
    }

    @Action(UpdateCart)
    update({getState, patchState}: StateContext<UserStateModel>, {payload}: UpdateCart) {
        const state = getState();
        // patchState({

        // })
    }

    @Action(ClearProduct)
    clear({getState, patchState}: StateContext<UserStateModel>, {payload}: UpdateCart) {
        const state = getState();
        patchState({
            productList: []
        })
    }

}

// state.productList.map((item: any) => {
//     if(item._id == payload._id) {
//         state.productList.slice(0, 1);
//     }
// }