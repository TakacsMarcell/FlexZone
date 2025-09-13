import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  background: #0f0f0f; color: #fff; padding: 20px;
`;
const Card = styled.div`
  background: #1c1c1c; border-radius: 16px; padding: 30px; width: 100%; max-width: 480px;
`;
const Title = styled.h2` margin: 0 0 10px; `;
const Input = styled.input`
  width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #333; background: #111; color:#fff; margin: 12px 0;
`;
const Button = styled.button`
  width: 100%; padding: 12px; border: 0; border-radius: 10px; background: #65C466; color:#000; font-weight: 700; cursor: pointer;
`;
const Msg = styled.div` margin-top: 10px; color: #8bd48b; `;
const Err = styled.div` margin-top: 10px; color: #f77; `;

const ResetPassword = () => {
  const { token } = useParams();
  const history = useHistory();
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setOk(""); setErr("");
    if (pass1.length < 6) return setErr("A jelszó legalább 6 karakter legyen.");
    if (pass1 !== pass2) return setErr("A jelszavak nem egyeznek.");

    try {
      await publicRequest.post(`/auth/reset-password/${token}`, { password: pass1 });
      setOk("Jelszó frissítve. Átirányítás a bejelentkezéshez…");
      setTimeout(() => history.push("/login"), 2000);
    } catch (error) {
      setErr(error?.response?.data?.message || "Érvénytelen vagy lejárt link.");
    }
  };

  return (
    <Wrapper>
      <Card>
        <Title>Új jelszó megadása</Title>
        <form onSubmit={submit}>
          <Input type="password" placeholder="Új jelszó" value={pass1} onChange={(e)=>setPass1(e.target.value)} />
          <Input type="password" placeholder="Jelszó megerősítése" value={pass2} onChange={(e)=>setPass2(e.target.value)} />
          <Button type="submit">Jelszó beállítása</Button>
        </form>
        {ok && <Msg>{ok}</Msg>}
        {err && <Err>{err}</Err>}
      </Card>
    </Wrapper>
  );
};

export default ResetPassword;
