import { Stats } from "./Stats";

export const getFilterTypeTotal = (filterType : any) => {

    let today = new Date();
    let initial = new Date();
    let final = new Date();

    switch (filterType) {
        case Stats.THIS_MONTH: {
          initial = new Date(today.getFullYear(), today.getMonth(), 1);
          final = new Date(today.getFullYear(), today.getMonth(), 31);
          break;
        }
        case Stats.THIS_YEAR: {
          initial = new Date(today.getFullYear(), 1, 1);
          final = new Date(today.getFullYear(), 12, 31);
          break;
        }
      }

    return {
        initial : initial,
        final : final
    }
}