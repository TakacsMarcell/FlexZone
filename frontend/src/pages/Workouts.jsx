import { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { publicRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const floatIn = keyframes`
  from { opacity: 0; transform: translateY(16px) }
  to   { opacity: 1; transform: translateY(0) }
`;

const Page = styled.div`
  min-height: 100vh;
  color: #fff;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #0a0a0a, #0d130d);
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1900px;
  margin: 0 auto;
  padding: 28px clamp(16px, 3vw, 40px);
  display: grid;
  gap: 32px;
  grid-template-columns: 520px minmax(520px, 1fr);

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;
const LeftCol = styled.div`
  display: grid;
  gap: 28px;
  align-content: start;
`;
const Section = styled.section`
  background: rgba(27, 27, 27, 0.9);
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  padding: 18px;
  animation: ${floatIn} .35s ease both;
`;
const SectionTitle = styled.h2`
  font-size: 18px;
  color: #65c466;
  margin: 0 0 12px;
`;
const PlanGrid = styled.div`
  display: grid;
  gap: 14px;
`;
const PlanCard = styled.button`
  text-align: left;
  background: ${({completed}) => completed 
    ? "linear-gradient(180deg, #1e4020, #2b4d2d)" 
    : "linear-gradient(180deg, #171717, #1a1a1a)"};
  border: 1px solid ${({completed}) => completed ? "#65c466" : "#2a2a2a"};
  border-radius: 14px;
  padding: 14px;
  cursor: pointer;
  transition: 0.2s;
  display: grid;
  gap: 6px;
  min-height: 110px;

  &:hover {
    transform: translateY(-2px);
    border-color: #65c466;
  }

  .title { font-size: 16px; font-weight: 700; color: #e9ffe9; }
  .progress { font-size: 12px; color: #9ddf9f; }
`;
const Filters = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;

  select {
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #2d2d2d;
    background: #151515;
    color: #fff;
    min-width: 140px;
  }
`;
const Detail = styled.section`
  background: rgba(27,27,27,.95);
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  padding: 22px;
  min-height: 520px;
  animation: ${floatIn} .35s ease both .06s;
`;
const DetailHeader = styled.div`
  margin-bottom: 14px;
  h1 { margin: 0; font-size: 20px; color: #e6ffe6; }
`;
const ProgressBarWrap = styled.div`
  background: #121212;
  border: 1px solid #2a2a2a;
  border-radius: 999px;
  height: 12px;
  overflow: hidden;
  margin: 10px 0 16px;
`;
const ProgressBarFill = styled.div`
  height: 100%;
  width: ${({w}) => w}%;
  background: linear-gradient(90deg, #65c466, #9af59b);
  transition: width .3s ease;
`;
const ExerciseRow = styled.label`
  display: grid;
  grid-template-columns: 28px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 12px 8px;
  border-bottom: 1px solid #2b2b2b;

  &:last-child { border-bottom: 0; }

  input[type="checkbox"] {
    width: 18px; height: 18px;
    accent-color: #65c466;
    cursor: pointer;
  }
  .name { font-weight: 700; }
  .right { font-size: 12px; color: #c9c9c9; }
  .desc { grid-column: 2 / -1; font-size: 12px; color: #a8a8a8; margin-top: 4px; }
`;

const DonutWrap = styled.div`
  display: grid;
  justify-items: center;
  gap: 10px;
  text-align: center;
`;
const Donut = styled.div`
  --size: 160px;
  --bg: #101010;
  --track: #232323;
  position: relative;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background:
    conic-gradient(#65c466 ${({deg}) => deg}deg, #273327 ${({deg}) => deg}deg 360deg);
  box-shadow: inset 0 0 20px rgba(0,0,0,.45);
  border: 1px solid #2a2a2a;

  &::after {
    content: "";
    position: absolute;
    inset: 18px;
    border-radius: 50%;
    background: var(--bg);
    box-shadow: inset 0 0 0 1px var(--track);
  }
`;
const DonutCenter = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
  > div { position: relative; top: 2px; }
  .big { font-size: 22px; font-weight: 800; color: #eaffea; }
  .sub { font-size: 12px; color: #a8e1aa; margin-top: 2px; }
`;

const fetchProgress = async (plans, userId) => {
  const results = await Promise.all(plans.map(async (p) => {
    try {
      const prog = await publicRequest.get(`/progress/${p._id}`, {
        params: { userId },
      });
      return {
        planId: p._id,
        done: prog.data?.completedExercises?.length || 0,
        total: p.exercises?.length || 0,
        completed: prog.data?.completed || false,
      };
    } catch {
      return { planId: p._id, done: 0, total: p.exercises?.length || 0, completed: false };
    }
  }));
  return results.reduce((acc, pr) => ({ ...acc, [pr.planId]: pr }), {});
};

const Workouts = () => {
  const user = useSelector((s) => s.user.currentUser);

  const [level, setLevel] = useState("kezdo");
  const [type, setType] = useState("sulyemeles");
  const [gender, setGender] = useState("male");

  const [recommended, setRecommended] = useState([]);
  const [plans, setPlans] = useState([]);           
  const [loadingPlans, setLoadingPlans] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checked, setChecked] = useState([]);
  const [progressMap, setProgressMap] = useState({}); 

  const [allPlans, setAllPlans] = useState([]);
  const [allProgressMap, setAllProgressMap] = useState({});

  useEffect(() => {
    const loadRec = async () => {
      if (!user?._id) return;
      try {
        const res = await publicRequest.get(`/workouts/recommended/${user._id}`);
        setRecommended(res.data || []);
        if (res.data?.length) {
          const map = await fetchProgress(res.data, user._id);
          setProgressMap(prev => ({ ...prev, ...map }));
        }
      } catch (e) { console.error(e); }
    };
    loadRec();
  }, [user]);

  useEffect(() => {
    const loadAllGlobal = async () => {
      try {
        const res = await publicRequest.get(`/workouts`); 
        setAllPlans(res.data || []);
        if (user?._id && res.data?.length) {
          const map = await fetchProgress(res.data, user._id);
          setAllProgressMap(map);
        } else {
          setAllProgressMap({});
        }
      } catch (e) { console.error(e); }
    };
    loadAllGlobal();
  }, [user]);

  useEffect(() => {
    const loadAll = async () => {
      try {
        setLoadingPlans(true);
        const res = await publicRequest.get(`/workouts`, { params: { level, type, gender } });
        setPlans(res.data || []);
        if (user?._id && res.data?.length) {
          const map = await fetchProgress(res.data, user._id);
          setProgressMap(prev => ({ ...prev, ...map }));
        }
      } catch (e) { console.error(e); }
      finally { setLoadingPlans(false); }
    };
    loadAll();
  }, [level, type, gender, user]);

  useEffect(() => {
    const loadProgress = async () => {
      setChecked([]);
      if (!selectedPlan?._id || !user?._id) return;
      try {
        const res = await publicRequest.get(`/progress/${selectedPlan._id}`, {
          params: { userId: user._id },
        });
        setChecked(res.data?.completedExercises || []);
      } catch (e) { console.error(e); }
    };
    loadProgress();
  }, [selectedPlan, user]);

  const toggle = async (name) => {
    const newChecked = checked.includes(name)
      ? checked.filter((n) => n !== name)
      : [...checked, name];
    setChecked(newChecked);

    if (selectedPlan?._id && user?._id) {
      try {
        await publicRequest.post(`/progress`, {
          userId: user._id,
          planId: selectedPlan._id,
          completedExercises: newChecked,
        });

        setProgressMap(prev => ({
          ...prev,
          [selectedPlan._id]: {
            done: newChecked.length,
            total: selectedPlan.exercises?.length || 0,
            completed: newChecked.length === (selectedPlan.exercises?.length || 0),
          }
        }));

        setAllProgressMap(prev => {
          if (!prev[selectedPlan._id]) return prev;
          return {
            ...prev,
            [selectedPlan._id]: {
              done: newChecked.length,
              total: selectedPlan.exercises?.length || 0,
              completed: newChecked.length === (selectedPlan.exercises?.length || 0),
            }
          };
        });
      } catch (e) { console.error("Mentési hiba:", e); }
    }
  };

  const hasSelection = !!selectedPlan?._id;
  const total = selectedPlan?.exercises?.length || 0;
  const done = checked.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const renderPlanCard = (p) => {
    const prog = progressMap[p._id] || {};
    const doneCount = prog.done || 0;
    const totalCount = prog.total || (p.exercises?.length || 0);
    const completed = prog.completed || (totalCount > 0 && doneCount === totalCount);
    return (
      <PlanCard 
        key={p._id} 
        onClick={() => setSelectedPlan(p)}
        completed={completed}
      >
        <div className="title">{p.title} {completed}</div>
        <div className="progress">{doneCount}/{totalCount}</div>
      </PlanCard>
    );
  };

  const totalAllPlans = allPlans.length;
  const completedAllPlans = useMemo(() => {
    return allPlans.reduce((acc, p) => {
      const pr = allProgressMap[p._id] || {};
      const total = pr.total || (p.exercises?.length || 0);
      const done = pr.done || 0;
      return acc + (total > 0 && done === total ? 1 : 0);
    }, 0);
  }, [allPlans, allProgressMap]);

  const donutPct = totalAllPlans ? Math.round((completedAllPlans / totalAllPlans) * 100) : 0;
  const donutDeg = donutPct * 3.6;

  return (
    <Page>
      <Announcement />
      <Navbar />
      <Wrapper>
        <LeftCol>
          <Section>
            <SectionTitle>Elvégzett edzéstervek</SectionTitle>
            {totalAllPlans === 0 ? (
              <p style={{opacity:.8}}>Nincs adat a kimutatáshoz.</p>
            ) : (
              <DonutWrap>
                <div style={{position:"relative"}}>
                  <Donut deg={donutDeg} />
                  <DonutCenter>
                    <div>
                      <div className="big">{completedAllPlans}/{totalAllPlans}</div>
                      <div className="sub">kész edzésterv • {donutPct}%</div>
                    </div>
                  </DonutCenter>
                </div>
              </DonutWrap>
            )}
          </Section>

          <Section>
            <SectionTitle>Neked ajánlott</SectionTitle>
            {recommended.length === 0 
              ? <p style={{opacity:.8}}>Nincs ajánlott edzésterv.</p>
              : <PlanGrid>{recommended.map(renderPlanCard)}</PlanGrid>}
          </Section>

          <Section>
            <SectionTitle>Összes terv</SectionTitle>
            <Filters>
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="kezdo">Kezdő</option>
                <option value="halado">Haladó</option>
                <option value="profi">Profi</option>
              </select>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="kardio">Kardió</option>
                <option value="sulyemeles">Súlyemelés</option>
                <option value="otthoni">Otthoni</option>
              </select>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="both">Mindkettő</option>
                <option value="male">Férfi</option>
                <option value="female">Nő</option>
              </select>
            </Filters>
            {loadingPlans 
              ? <p style={{opacity:.8}}>Betöltés…</p>
              : plans.length === 0 
                ? <p style={{opacity:.8}}>Nincs találat.</p>
                : <PlanGrid>{plans.map(renderPlanCard)}</PlanGrid>}
          </Section>
        </LeftCol>

        <Detail>
          {hasSelection ? (
            <>
              <DetailHeader><h1>{selectedPlan.title}</h1></DetailHeader>
              <div style={{fontSize:12, color:"#c9eecb", marginBottom:4}}>
                Haladás: <b>{done}/{total}</b> • <b>{pct}%</b>
              </div>
              <ProgressBarWrap><ProgressBarFill w={pct} /></ProgressBarWrap>
              {selectedPlan.exercises?.map((ex, idx) => (
                <ExerciseRow key={idx}>
                  <input
                    type="checkbox"
                    checked={checked.includes(ex.name)}
                    onChange={() => toggle(ex.name)}
                  />
                  <div className="name">{ex.name}</div>
                  <div className="right">{ex.sets}×{ex.reps}</div>
                  {ex.description && <div className="desc">{ex.description}</div>}
                </ExerciseRow>
              ))}
            </>
          ) : <div style={{opacity:.8}}>Válassz egy edzéstervet!</div>}
        </Detail>
      </Wrapper>
      <Footer />
    </Page>
  );
};

export default Workouts;
