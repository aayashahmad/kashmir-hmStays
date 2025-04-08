const MyButton = ({
  title,
  screenWidth,
  buttonAction,
  primary,
  secondary,
  width,
}) => {
  return (
    <div
      onClick={buttonAction}
      style={{
        ...styles.generalButton,
        ...(primary ? styles.primaryButton : {}),
        ...(secondary ? styles.secondaryButton : {}),
        ...(width ? { width: width } : {}),
      }}
    >
      <span style={styles.make_call_button}>{title}</span>
    </div>
  );
};

const styles = {
  generalButton: {
    borderRadius: "7px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "#444",
    width: "48%",
    color: "#fff",
    height: "46px",
    textAlign: "center",
  },
  primaryButton: {
    backgroundColor: "#f47625",
  },
  secondaryButton: {
    backgroundColor: "#2f343c",
  },
  call_one: {
    borderRadius: "7px",
    border: "1px solid #1f2c4b",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
  },
  call_one_max_1240: {
    height: "40px",
    width: "135px",
  },
  call_one_max_1100: {
    height: "35px",
    width: "125px",
  },
  call_one_max_1024: {
    height: "50px",
    width: "150px",
  },
  call_one_max_400: {
    height: "30px",
    width: "120px",
    fontSize: "12px",
  },
  make_call_button: {
    fontSize: "14px",
    fontWeight: 500,
  },
};

export default MyButton;
