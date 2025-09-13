import { useState } from "react";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  background: #0f0f0f; color: #fff; padding: 20px;
`;
const Card = styled.div`
  background: #1c1c1c; border-radius: 16px; padding: 30px; width: 100%; max-width: 480px;
`;
const Title = styled.h2` margin: 0 0 10px; `;
const P = styled.p` color: #bbb; `;
const Input = styled.input`
  width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #333; background: #111; color:#fff; margin: 12px 0;
`;
const Button = styled.button`
  width: 100%; padding: 12px; border: 0; border-radius: 10px; background: #65C466; color:#000; font-weight: 700; cursor: pointer;
`;
const Msg = styled.div` margin-top: 10px; color: #8bd48b; `;
const Err = styled.div` margin-top: 10px; color: #f77; `;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    setOk(""); setErr("");
    try {
      await publicRequest.post("/auth/forgot-password", { email });
      setOk("Ha létező email, küldtünk levelet a visszaállításhoz.");
      setTimeout(() => history.push("/login"), 3000);
    } catch (error) {
      setErr("Hiba történt. Próbáld újra később.");
    }
  };

  return (
    <Wrapper>
      <Card>
        <Title>Elfelejtett jelszó</Title>
        <P>Add meg a regisztrált e-mail címed, és küldünk egy visszaállító linket.</P>
        <form onSubmit={submit}>
          <Input type="email" required placeholder="E-mail cím" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <Button type="submit">Link küldése</Button>
        </form>
        {ok && <Msg>{ok}</Msg>}
        {err && <Err>{err}</Err>}
      </Card>
    </Wrapper>
  );
};

export default ForgotPassword;
