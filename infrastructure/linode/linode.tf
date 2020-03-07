provider "linode" {
    token = "$LINODE_TOKEN"
}

resource "linode_instance" "vr" {
    image = "linode/ubuntu18.04"
    label = "omnipresent VR"
    group = "vr"
    region = "us-east"
    type = "g6-nanode-1"
    authorized_keys = []
    root_pass = "$ROOT_PASS"
}
