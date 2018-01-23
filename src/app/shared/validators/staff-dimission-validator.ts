import {FormGroup} from "@angular/forms";
export function leaderValid(group: FormGroup): Object {
  let leader_valid = true;
  if (!group.get('leader_id').value && !group.get('leader').get('is_leader_id').value) {
    leader_valid = false;
  }
  return leader_valid ? null : {leader_valid: {msg: '请选择移交主管'}};
}
