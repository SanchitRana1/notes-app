import { useSnackbar } from "notistack";

const useShowMessage = (state,message) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    closeSnackbar();
    enqueueSnackbar(message, {
      variant: state,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
}

export default useShowMessage

