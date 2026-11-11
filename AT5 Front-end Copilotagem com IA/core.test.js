import test from 'node:test';
import assert from 'node:assert/strict';
import { scenarios, evaluate, buildProtocol } from './scenarios.js';
import { getDataset } from './data.js';
import { readPreference, writePreference } from './theme.js';
test('todas as 81 trajetórias têm resultado limitado e quatro ações',()=>{
  for(const a of scenarios[0].options) for(const b of scenarios[1].options)
  for(const c of scenarios[2].options) for(const d of scenarios[3].options){
    const result = evaluate([a.id,b.id,c.id,d.id]);
    assert.ok(result.points>=0 && result.points<=8); assert.equal(result.actions.length,4);
    assert.match(buildProtocol(result),/Não mede personalidade/);
  }
});
test('extremos e respostas inválidas',()=>{
  assert.equal(evaluate(['revisar','encaminhar','discutir','explicar']).points,8);
  assert.equal(evaluate(['enviar','fechar','aceitar','copiar']).points,0);
  for(const invalid of [null,[],['revisar'],['x','fechar','aceitar','copiar']]) assert.throws(()=>evaluate(invalid),TypeError);
});
test('fonte final e integridade do dataset',()=>{
  const data=getDataset('produtividade'); assert.deepEqual(data.values,[15,30]);
  data.values[0]=999; assert.equal(getDataset('produtividade').values[0],15);
  assert.throws(()=>getDataset('__proto__'),TypeError);
});
test('tema não quebra com armazenamento bloqueado ou valor inválido',()=>{
  const broken={getItem(){throw new Error('blocked')},setItem(){throw new Error('blocked')}};
  assert.equal(readPreference(broken),null); assert.equal(writePreference(broken,'dark'),false);
  assert.equal(readPreference(null),null);
  assert.equal(readPreference({getItem:()=>'<script>'}),null);
  const store=new Map();const storage={getItem:k=>store.get(k),setItem:(k,v)=>store.set(k,v)};
  assert.equal(writePreference(storage,'light'),true);assert.equal(readPreference(storage),'light');
});
